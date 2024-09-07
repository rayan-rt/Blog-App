import { Router } from "express";
import {
	handleSignin,
	handleSignout,
	handleSignup,
	handleUploadProfile,
} from "../controllers/user.controller.js";
import { upload } from "../utils/multer.js";

export const router = Router();

router.post("/signup", handleSignup);
router.post("/signin", handleSignin);
router.get("/signout", handleSignout);

router.post("/upload_profile", upload.single("image"), handleUploadProfile);
