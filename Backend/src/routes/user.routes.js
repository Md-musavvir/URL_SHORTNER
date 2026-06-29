import { Router } from "express";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.use(verifyJwt);
router.post("/logout", logoutUser);
router.get("/current-user", getCurrentUser);
export default router;
