import { Router } from "express";
import acceptMember from "../controllers/groups/acceptMember.js";
import createGroup from "../controllers/groups/createGroup.js";
import getGroupRequests from "../controllers/groups/getGroupRequests.js";
import getGroups from "../controllers/groups/getGroups.js";
import joinGroup from "../controllers/groups/joinGroup.js";
import searchGroup from "../controllers/groups/searchGroups.js";
const router = Router();

router.post("/getGroups", getGroups);
router.post("/getGroupRequests", getGroupRequests);
router.post("/create", createGroup);
router.post("/search", searchGroup);
router.post("/join", joinGroup);
router.post("/accept", acceptMember);

export default router;
