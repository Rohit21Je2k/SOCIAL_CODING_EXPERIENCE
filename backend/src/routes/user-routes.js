import { Router } from "express";

import {
  getDashboard,
  follow,
  unFollow,
  getFollowing,
  search,
  getLeaderBoard,
  getUsers,
  removeFollower,
} from "../controllers/user/_index.js";

import { isValidToken } from "../middleware/validators/_index.js";

const router = Router();

router.get("/users", getUsers);

router.post("/dashboard/:username", getDashboard);

router.get("/search/:username", search);

router.get("/leaderboard", getLeaderBoard);

router.post("/follow", isValidToken, follow);
router.post("/unfollow", isValidToken, unFollow);
router.post("/removefollower", isValidToken, removeFollower);
router.get("/following/:username", getFollowing);

export default router;
