import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { httpError } from "../../util/functions/_index.js";

const validator = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw httpError("Invalid token");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    if (!decodedToken) {
      throw httpError("Invalid token");
    }
    req.decodedToken = decodedToken;
    next();
  } catch (err) {
    if (err.error) {
      return res.status(422).json(err);
    }
    return res.status(422).json(httpError("authentication failed"));
  }
};

export default validator;
