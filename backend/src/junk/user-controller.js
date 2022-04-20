import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const JWT_KEY = "supersecret_dontshare";

export const getUsers = async (req, res, next) => {
  users = await User.find({});
  res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  // validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).send({
      message: "Invalid Inputs",
    });

  let like = 0;
  //   extract inputs
  const {
    name,
    email,
    password,
    github_username,
    leetcode_username,
    codechef_username,
  } = req.body;

  //   check for existing user
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
    });
  }

  //   if user exists
  if (existingUser) {
    return res.status(422).send({
      message: "User Already Exist",
    });
  }
  // hash password before saving
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
    });
  }

  // create new User
  const createdUser = new User({
    name, // name: name
    email,
    password: hashedPassword,
    github_username: github_username,
    leetcode_username: leetcode_username,
    codechef_username: codechef_username,
    likes: like,
  });

  //   store to database
  try {
    await createdUser.save();
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
    });
  }

  //   generate JWT token
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
    });
  }

  //   send response back
  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    friends: createdUser.friends,
    token: token,
    github_username,
    leetcode_username,
    codechef_username,
  });
};

export const login = async (req, res, next) => {
  // validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).send({
      message: "Invalid Inputs",
    });

  //   extract inputs
  const { email, password } = req.body;

  //   check for user exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
    });
  }

  //   user does not exists
  if (!existingUser)
    return res.status(401).send({
      message: "User does not exist",
    });

  //   validate password
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
    });
  }

  //    password dont match
  if (!isValidPassword) {
    return res.status(422).send({
      message: "Invalid Credentials",
    });
  }

  //   generate token
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
    });
  }

  //   send response
  res.status(201).json({
    name: existingUser.name,
    userId: existingUser.id,
    email: existingUser.email,
    friends: existingUser.friends,
    token: token,
    github_username: existingUser.github_username,
    leetcode_username: existingUser.leetcode_username,
    codechef_username: existingUser.codechef_username,
  });
};

export const getleaderboard = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, [
      "-password",
      "-github_username",
      "-leetcode_username",
      "-codechef_username",
      "-friends",
    ]);

    users.sort(function (c, d) {
      if (!c.likes) {
        c.likes = 0;
      }
      if (!d.likes) {
        d.likes = 0;
      }
      // console.log(c.likes+" "+d.likes);
      return d.likes - c.likes;
    });
    res.status(201).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Server Error",
    });
  }

  // console.log(users);
};

export const sendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    if (!userId || !friendId) {
      throw {
        error: "Invalid inputs",
      };
    }
    const user1 = await User.findOne({ email: userId });
    if (!user1) {
      throw {
        error: "User not found",
      };
    }
    if (user1.friends.includes(friendId)) {
      throw {
        error: "Already added as friend",
      };
    }
    const user2 = await User.findOne({ email: friendId });
    if (!user2) {
      throw {
        error: "Friend not found",
      };
    }

    user1.friends.push(friendId);
    user2.friends.push(userId);

    await user1.save();
    await user2.save();
    res.send("Success");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const unFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    if (!userId || !friendId) {
      throw {
        error: "Invalid inputs",
      };
    }
    const user1 = await User.findOne({ email: userId });
    if (!user1) {
      throw {
        error: "User not found",
      };
    }
    if (!user1.friends.includes(friendId)) {
      throw {
        error: "Friend not found",
      };
    }

    const user2 = await User.findOne({ email: friendId });
    if (!user2) {
      throw {
        error: "Friend not found",
      };
    }

    user1.friends.pull(friendId);
    user2.friends.pull(userId);

    await user1.save();
    await user2.save();
    res.send("Success");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
