import { Router } from "express";

// import { getUsers } from "../controllers/user-controller.js";

import {
  getDashboard,
  follow,
  unFollow,
  getFollowing,
  search,
  getLeaderBoard,
  getUsers,
} from "../controllers/user/_index.js";

import { isValidToken } from "../middleware/validators/_index.js";

const router = Router();

router.get("/users", getUsers);

router.post("/dashboard/:username", getDashboard);

router.get("/search/:username", search);

router.get("/leaderboard", getLeaderBoard);

router.post("/follow", isValidToken, follow);
router.post("/unfollow", isValidToken, unFollow);
router.get("/following/:username", getFollowing);

export default router;
