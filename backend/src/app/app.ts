import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import routes from "./routes";

import { notFoundMiddleware } from "../common/middleware/notFound.middleware";
import { errorMiddleware } from "../common/middleware/error.middleware";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

//Use Express JSON middleware to parse incoming JSON requests
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/v1", routes);

///
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SalesFlow AI API is running 🚀",
    version: "v1",
  });
});

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;