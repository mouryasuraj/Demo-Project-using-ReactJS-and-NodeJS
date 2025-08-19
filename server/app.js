import express from "express";
import dotenv from "dotenv";
import connectDB from "./connections/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import profileRouter from "./routes/profile.router.js";
import userRouter from "./routes/user.router.js";
import requestRouter from "./routes/request.router.js";
dotenv.config();

const port = process.env.PORT;
const clientURL = process.env.CLIENT_URL;
const app = express();

app.use(cors({ origin: clientURL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/user", userRouter);
app.use("/request", requestRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Database connection established");
    });
  })
  .catch((err) => {
    console.log("Database connection failed: ", err);
  });
