import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import dotenv from "dotenv";
import usecpRoutes from "./routes/cproutes.js";
dotenv.config();

const app = express();

// cors
app.use(cors());

// bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// api
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/users", userRouter);

//cp routes
app.use("/api/cproutes", usecpRoutes);

// path not found
app.use((req, res, next) => {
  res.status(400).send({
    message: "path does not exist",
  });
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
