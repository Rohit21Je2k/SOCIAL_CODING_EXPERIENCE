import { Router } from "express";
import { check } from "express-validator";

import {
  getUsers,
  getUser,
  signup,
  login,
  getleaderboard,
  sendRequest,
  unFriend,
} from "../controllers/user-controller.js";
import { getGlobalLeaderboard } from "../controllers/leaderboard.js";

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

router.post("/", [check("email").not().isEmpty()], getUser);

router.get("/users", getUsers);

router.get("/leaderboard", getGlobalLeaderboard);

router.post("/addfriend", sendRequest);

router.post("/unfriend", unFriend);

export default router;
