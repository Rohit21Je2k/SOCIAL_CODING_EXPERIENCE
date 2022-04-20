import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../../models/auth.js";
import { httpError } from "../../util/functions/_index.js";

const JWT_KEY = process.env.JWT_KEY;

const login = async (req, res) => {
  try {
    // extract inputs
    const { username, password } = req.body;

    // check for user exists
    const existingUser = await Auth.findOne({ username });

    // user does not exists
    if (!existingUser) {
      throw httpError("user does not exists");
    }

    // comparing password
    const isValidPassword = await bcrypt
      .compare(password, existingUser.password)
      .catch(() => {
        throw httpError("Validation failed");
      });

    // invalid password
    if (!isValidPassword) {
      throw httpError("invalid credentials");
    }

    // generate token
    const token = jwt.sign(
      {
        username: existingUser.username,
      },
      JWT_KEY,
      { expiresIn: "1h" }
    );

    // send response
    res.send({
      username: existingUser.username,
      token: token,
    });
  } catch (err) {
    console.log(err);
    if (err.error) {
      return res.send(err);
    }
    res.send(httpError("Login failed"));
  }
};

export default login;
