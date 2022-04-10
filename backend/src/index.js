import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import authRouter from "./routes/auth-routes.js";
import dotenv from "dotenv";
import usecpRoutes from "./routes/cproutes.js";
import PlatformRouter from "./routes/platform-routes.js";
import puppeteer from "puppeteer";
import { httpError } from "./util/functions/_index.js";

dotenv.config();

const app = express();

app.use(cors());

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

function mid(req, res, next) {
  req.browser = browser;
  next();
}

// bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api
app.get("/", (req, res) => {
  res.send("hello");
});

// auth
app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

//cp routes
app.use("/api/cproutes", mid, usecpRoutes);

// platforms
app.use("/api/platform", PlatformRouter);

// path not found
app.use((req, res, next) => {
  res.send(httpError("path does not exist"));
});

mongoose
  .connect(
    `mongodb+srv://traviscott:yllt7EQ5xtzxjwqZ@cluster0.s4fs8.mongodb.net/social_coding?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 8000);
    console.log("connection to server and database established");
  })
  .catch((err) => console.log(err));
