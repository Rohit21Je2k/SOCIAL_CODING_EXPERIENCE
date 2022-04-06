import { Router } from "express";
import { getLeetCodeData } from "../controllers/leetcode/getleetcode.js";

const router = Router();

router.get("/leetcode/:userId", getLeetCodeData);

export default router;
