import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Auth from "../../models/auth.js";
import User from "../../models/user.js";
import { httpError } from "../../util/functions/_index.js";

const JWT_KEY = process.env.JWT_KEY;

const saltRounds = 12;

const signup = async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      github_username,
      leetcode_username,
      codechef_username,
    } = req.body;

    //   check for existing user
    const existingUser = await Auth.findOne({ username });

    //   if user exists
    if (existingUser) {
      throw httpError("UserName already Exists");
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create Auth
    const createdAuth = new Auth({
      username,
      password: hashedPassword,
    });

    // create new User
    const createdUser = new User({
      name,
      username,
      leetcode: {
        username: leetcode_username,
      },
      github: {
        username: github_username,
      },
      codechef: {
        username: codechef_username,
      },
      rank: 500_000,
      nextUpdateCycle: new Date().getTime(),
    });

    //   store to database
    await createdUser.save().catch((err) => {
      console.log(err);
      throw httpError("Invalid User Details");
    });

    await createdAuth.save().catch((err) => {
      console.log(err);
      throw httpError("Invalid Auth Details");
    });

    //   generate JWT token
    const token = jwt.sign(
      {
        username: createdUser.username,
      },
      JWT_KEY,
      { expiresIn: "1h" }
    );

    //  send response back
    res.send({
      username: createdUser.username,
      token: token,
    });
  } catch (err) {
    console.log(err);
    if (err.error) {
      return res.send(err);
    }
    res.send(httpError("Signup failed"));
  }
};

export default signup;
