import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.set('view engine', 'ejs');

import tickerRouter from "./routes/ticker.route.js";
app.use('/api/v1/tickers', tickerRouter);

app.use('', tickerRouter);

export { app };
