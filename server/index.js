import express from "express";
import dotenv from "dotenv";
import connect from "./db/connect.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

//middlewares
app.use(express.json({ limit: "30mb" }));
app.use(cors({
    origin: ["https://hcmovieapp.netlify.app", "http://localhost:5173"],
    credentials: true,
}));
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.get("/", (req, res) => {
    res.status(200).json("Movie App Backend");
})

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
    try {
        await connect(MONGO_URI);
        console.log("Connected to mongodb");
        app.listen(PORT, () => {
            console.log(`server is running on PORT ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();