import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { redirectUrl } from "./controllers/Url.controller.js";
import urlRouter from "./routes/url.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ strict: false, limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api/v3/user", userRouter);
app.use("/api/v3/url", urlRouter);
app.get("/:shortCode", redirectUrl);
export default app;
