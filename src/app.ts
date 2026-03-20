import express, { Request, Response } from "express";
import shortenUrlRouter from "./shortenUrl.router";

const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    timestamp: new Date(),
  });
});

app.use("/shorten-url", shortenUrlRouter);

export default app;
