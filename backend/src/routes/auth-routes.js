import { Router } from "express";
import { signup } from "../controllers/auth/signup.js";
import isEmpty from "../middleware/validators/isEmpty.js";
const router = Router();

router.post(
  "/signup",
  isEmpty({ path: "req.body.name", check: false, msg: "name is empty" }),
  signup
);

export default router;
