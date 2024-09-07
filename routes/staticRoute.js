import { Router } from "express";
import { Blog } from "../models/blog.model.js";

export const router = Router();

router.get("/", async (req, res) => {
	let blogs = await Blog.find();
	res.render("index", { title: "Home", user: req.user, blogs });
});

router.get("/profile", async (req, res) => {
	let blogs = await Blog.find({ createdBy: req.user._id });
	res.render("profile", { title: "Home", user: req.user, blogs });
});

router.get("/signin", (_, res) => res.render("signin", { title: "Sign In" }));
router.get("/signup", (_, res) => res.render("signup", { title: "Sign Up" }));

router.get("/add_blog", (req, res) =>
	res.render("addBlog", { title: "Add Blog", user: req.user }),
);

router.get("/update/:blogID", async (req, res) => {
	let { blogID } = req.params;
	let blog = await Blog.findById(blogID);
	res.render("addBlog", { title: "Add Blog", user: req.user, blog });
});
