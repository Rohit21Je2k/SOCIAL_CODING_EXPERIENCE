import { Router } from "express";
import { check } from "express-validator";

import {
  getUsers,
  getUser,
  signup,
  login,
} from "../controllers/user-controller.js";

const router = Router();

const passLength = 6;

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: passLength }),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: passLength }),
  ],
  login
);

router.post("/", [check("userId").not().isEmpty()], getUser);

router.get("/users", getUsers);

export default router;
