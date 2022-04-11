import { Router } from "express";

import { getUsers } from "../controllers/user-controller.js";

import {
  getDashboard,
  follow,
  unFollow,
  getFollowing,
  search,
} from "../controllers/user/_index.js";

const router = Router();

router.get("/dashboard/:username", getDashboard);

router.get("/users", getUsers);

router.get("/search/:username", search);

router.post("/follow", follow);
router.post("/unfollow", unFollow);
router.get("/following/:username", getFollowing);

export default router;
