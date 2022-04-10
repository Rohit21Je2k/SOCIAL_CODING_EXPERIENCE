import { Router } from "express";
// import { getLeetCodeData } from "../controllers/platform/leetcode/getLeetCodeData.js";
// import { getCodeChefData } from "../controllers/platform/codechef/getCodeChefData.js";
import { getDashboard } from "../controllers/user/_index.js";

const router = Router();

// router.get("/leetcode/:userId", getLeetCodeData);
// router.get("/codechef/:userId", getCodeChefData);
router.get("/:username", getDashboard);

export default router;
