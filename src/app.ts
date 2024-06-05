import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandaller from "./app/middlewares/globalErrorHandaller";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://l2-pet-client.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: " Server is Running ..",
  });
});

app.use("/api/v1", router);
app.use(globalErrorHandaller);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND !",
    error: {
      path: req.originalUrl,
      message: "Your Requested Path Not Found !",
    },
  });
});

export default app;
