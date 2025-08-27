import express from "express";
import dotenv from "dotenv";
import connectDB from "./connections/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import profileRouter from "./routes/profile.router.js";
import userRouter from "./routes/user.router.js";
import requestRouter from "./routes/request.router.js";
import paymentRouter from "./routes/payment.router.js";
dotenv.config();

const port = process.env.PORT;
const clientURL = process.env.CLIENT_URL;
const app = express();

app.use(cors({ origin: clientURL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/user", userRouter);
app.use("/api/request", requestRouter);
app.use("/api/payment", paymentRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Database connection established");
    });
  })
  .catch((err) => {
    console.log("Database connection failed: ", err);
  });
