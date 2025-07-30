import express from "express";
import dotenv from "dotenv";
import connectDB from "./connections/connectDB.js";
import authRouter from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const port = process.env.PORT;
const clientURL = process.env.CLIENT_URL;
const app = express();

app.use(cors({ origin: clientURL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Database connection established");
    });
  })
  .catch((err) => {
    console.log("Database connection failed: ", err);
  });
