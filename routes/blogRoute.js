import { Router } from "express";
import {
	handleCreateBlog,
	handleCreateBlogComment,
	handleDeleteBlog,
	handleUpdateBlog,
	handleViewBlog,
} from "../controllers/blog.controller.js";
import { upload } from "../utils/multer.js";

export const router = Router();

router.post("/create_blog", upload.single("image"), handleCreateBlog);
router.get("/:blogID", handleViewBlog);
router.post("/:blogID/comment", handleCreateBlogComment);
router.post("/update_blog/:blogID", upload.single("image"), handleUpdateBlog);
router.get("/delete/:blogID", handleDeleteBlog);
