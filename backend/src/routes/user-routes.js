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

import { getDashboard } from "../controllers/user/_index.js";
import { follow } from "../controllers/user/follow.js";
import { getfollower } from "../controllers/user/getfollower.js";
import { unfollow } from "../controllers/user/unfollow.js";

const router = Router();

// password length
const passLength = 6;

router.get("/dashboard/:username", getDashboard);

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

router.post('/follow',follow);
router.get('/getfollower',getfollower);
router.post('/unfollow',unfollow);


export default router;
