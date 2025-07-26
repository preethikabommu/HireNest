import express from "express";
import { login, logout, register, updateProfile, saveJob, unsaveJob, getSavedJobs } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

// Save for later endpoints
router.route("/save-job").post(isAuthenticated, saveJob);
router.route("/unsave-job").post(isAuthenticated, unsaveJob);
router.route("/saved-jobs").get(isAuthenticated, getSavedJobs);

export default router;

