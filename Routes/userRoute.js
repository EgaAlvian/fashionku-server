import "dotenv/config";
import express from "express";
import {
  register,
  login,
  fetchCurrentUser,
} from "../controllers/userController.js";
import { register as registerValidation } from "../middlewares/user.validation.js";
import { login as loginValidation } from "../middlewares/user.validation.js";
import { authentication } from "../middlewares/authentication.js";

const router = express.Router();

router.post("/register", registerValidation(), register);
router.post("/login", loginValidation(), login);
router.get("/current", authentication, fetchCurrentUser);

export default router;
