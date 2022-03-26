import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const JWT_KEY = "supersecret_dontshare";

export const getUser = async (req, res, next) => {
  // validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).send({
      message: "Invalid Inputs",
    });

  // extract inputs
  const { userId } = req.body;

  // find user
  let user;
  try {
    user = await User.findOne({ _id: userId });
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
    });
  }

  if (!user) {
    return res.status(500).send({
      message: "No User Found",
    });
  }

  //   send response back
  res.status(201).json({
    userId: user.id,
    email: user.email,
    name: user.name,
  });
};

export const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return res.status(500).send({
      message: "Server Error",
    });
  }
  res.status(200).json({ users: users });
  //   res
  //     .status(200)
  //     .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

export const signup = async (req, res, next) => {
  // validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).send({
      message: "Invalid Inputs",
    });

  //   extract inputs
  const { name, email, password } = req.body;

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
  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
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
  res
    .status(201)
    .json({ userId: existingUser.id, email: existingUser.email, token: token });
};
