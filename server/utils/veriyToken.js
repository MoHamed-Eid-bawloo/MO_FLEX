import jwt from "jsonwebtoken";
import errorHandler from "./errorHandler.js";

const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        next(errorHandler(401, "Unauthorized"));
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            next(403, "Forbidden");
        }

        req.user = user
        next();
    })
}

export default verifyToken;