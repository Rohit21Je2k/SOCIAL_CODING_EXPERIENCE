import { Router } from "express";
import { getcodechefProfile } from "../controllers/codechef.js";
import { getLeetCodeProfile } from "../controllers/leetcode.js";
// import { getcodechefProfile } from "../controllers/codechef.js";
const router = Router();

router.get("/leetcode/:userId", getLeetCodeProfile);
router.get("/codechef/:userId", getcodechefProfile);

export default router;
