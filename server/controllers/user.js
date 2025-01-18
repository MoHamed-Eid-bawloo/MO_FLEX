import User from "../models/user.js";
import errorHandler from "../utils/errorHandler.js";
import argon2 from "argon2"

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    let { username, password, email, avatar } = req.body;

    if (req.user.id != id) {
        next(errorHandler(403, "You are not allowed to update another user"));
    }

    try {
        if (password) {
            password = await argon2.hash(password);
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: {
                username,
                password,
                email,
                avatar
            }
        }, { new: true });

        const { password: pass, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(403, "You are not allowed to delete another user"));
    }

    try {
        await User.findByIdAndDelete(req.params.id);

        res.clearCookie("access_token");

        res.status(200).json("User deleted successfully");
    } catch (err) {
        next(err);
    }
};


const addToFavorites = async (req, res, next) => {
    const { id, movieId } = req.params;

    if (req.user.id != id) next(errorHandler(403, "Log In to your own account to like for your own movies!"));

    try {
        const user = await User.findById(id);
        const favoriteMovies = user.favoriteMovies;
        console.log(favoriteMovies)
        const movie = favoriteMovies.find((movie) => movieId == movie);

        // responsible for removing a movieId from the array
        if (movie) {
            const response = await User.updateOne({ _id: id }, { $pull: { favoriteMovies: movieId } });
            res.status(200).json({ ...response, isLiked: false });
            return;
        }

        const response = await User.updateOne({ _id: id }, { $push: { favoriteMovies: { $each: [movieId] } } });

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

const addToWatchlist = async (req, res, next) => {
    const { id, movieId } = req.params;

    if (req.user.id != id) next(errorHandler(403, "Log In to your own account to like for your own movies!"));

    try {
        const user = await User.findById(id);
        const watchlist = user.watchlist;

        const movie = watchlist.find((movie) => movieId == movie);

        if (movie) {
            const response = await User.updateOne({ _id: id }, { $pull: { watchlist: movieId } });
            res.status(200).json({ ...response, partOfWatchlist: false });
            return;
        }

        const response = await User.updateOne({ _id: id }, { $push: { watchlist: { $each: [movieId] } } });

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

const getFavoritesAndWatchlist = async (req, res, next) => {
    const { id } = req.params;

    if (req.user.id != id) next(errorHandler(403, "Sorry mate login to your own account to see your reactions"));

    try {
        const user = await User.findById(id);

        if (!user) {
            next(errorHandler(404, "Sorry user not found"));
            return;
        }

        const { favoriteMovies, watchlist } = user._doc;

        res.status(200).json({ favoriteMovies, watchlist });
    } catch (err) {
        next(err);
    }
}

export {
    updateUser,
    deleteUser,
    addToFavorites,
    addToWatchlist,
    getFavoritesAndWatchlist
}