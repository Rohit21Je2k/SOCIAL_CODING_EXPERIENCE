import { Router } from "express";
import { signup } from "../controllers/auth/_index.js";
import { isEmpty } from "../middleware/validators/_index.js";
const router = Router();

router.post(
  "/signup",
  isEmpty({ path: "req.body.name", check: true, msg: "name is empty" }),
  signup
);

export default router;
