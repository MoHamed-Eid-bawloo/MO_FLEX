import argon2 from "argon2";
import User from "../models/user.js";
import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const cookieOptions = {    
    secure: true,
    httpOnly: true,
    sameSite: "strict",
};

const signUp = async (req, res, next) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { password, ...userData } = req.body;

    try {
        const user = await User.findOne({ email: userData.email });
        if (user) {
            return next(errorHandler(400, "email already exists, please choose another one"));
        }

        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ password: hashedPassword, ...userData });
        await newUser.save();

        return res.status(200).json("User created successfully");
    } catch (err) {
        next(err);
    }
};

const logIn = async (req, res, next) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, `User with email ${email} does not exist`));
        }

        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword) {
            return next(errorHandler(400, "Wrong credentials"));
        }

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
        const { password: pass, ...userData } = user._doc;

        res
            .cookie("access_token", token, cookieOptions)
            .status(200)
            .json(userData);
    } catch (err) {
        next(err);
    }
};

const logOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json("Logged out successfully");
    } catch (err) {
        next(err);
    }
};

export {
    signUp,
    logIn,
    logOut
};
