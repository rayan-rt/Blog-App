import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comment.model.js";

async function handleCreateBlog(req, res, next) {
	let { title, body } = req.body;
	let coverImageURL = req.file.filename;
	let new_blog = await Blog.create({
		title,
		body,
		coverImageURL,
		createdBy: req.user._id,
	});
	res.redirect("/");
}

async function handleViewBlog(req, res, next) {
	let { blogID } = req.params;
	let blog = await Blog.findById(blogID).populate("createdBy");
	let comments = await Comment.find({ blogID }).populate("createdBy");

	res.render("particularBlog", {
		blog,
		comments,
		title: "Blog",
		user: req.user,
	});
}

async function handleUpdateBlog(req, res, next) {
	let { blogID } = req.params;
	let { title, body } = req.body;
	let coverImageURL = req.file ? req.file.filename : null;
	let blog_to_update = await Blog.findById(blogID);
	blog_to_update.title = title;
	blog_to_update.body = body;
	blog_to_update.coverImageURL = coverImageURL
		? coverImageURL
		: blog_to_update.coverImageURL;

	await blog_to_update.save();
	res.redirect(`/blog/${blogID}`);
}

async function handleDeleteBlog(req, res, next) {
	let { blogID } = req.params;
	await Blog.findOneAndDelete({ _id: blogID });
	res.redirect("/");
}

async function handleCreateBlogComment(req, res, next) {
	await Comment.create({
		content: req.body.content,
		blogID: req.params.blogID,
		createdBy: req.user._id,
	});
	res.redirect(`/blog/${req.params.blogID}`);
}

export {
	handleCreateBlog,
	handleViewBlog,
	handleUpdateBlog,
	handleCreateBlogComment,
	handleDeleteBlog,
};
