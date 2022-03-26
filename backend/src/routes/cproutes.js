import { Router } from "express";
import { getLeetCodeProfile } from "../controllers/leetcode.js";
// import { getcodechefProfile } from "../controllers/codechef.js";
const router = Router();

router.get("/leetcode/:userId", getLeetCodeProfile);

export default router;
