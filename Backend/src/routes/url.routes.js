import { Router } from "express";

import {
  deleteUrl,
  getAllUrl,
  shortenUrl,
} from "../controllers/Url.controller.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = Router();

router.use(verifyJwt);
router.post("/shorten", shortenUrl);
router.get("/getAllUrl", getAllUrl);
router.delete("/delete/:id", deleteUrl);

export default router;
