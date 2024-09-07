import { User } from "../models/user.model.js";
import { signUser } from "../utils/JWT.js";

async function handleSignup(req, res, next) {
	let { fullName, email, password } = req.body;
	let user = await User.create({ fullName, email, password });
	res.redirect("/");
}

async function handleSignin(req, res, next) {
	let { email, password } = req.body;
	try {
		let token = await User.matchPasswordAndGenerateToken(email, password);
		res.cookie("JWT", token);
		res.redirect("/");
	} catch (error) {
		res.render("signin", { title: "Sign In", error: error.message });
	}
}

function handleSignout(_, res) {
	res.clearCookie("JWT").redirect("/");
}

async function handleUploadProfile(req, res, next) {
	let profileImageURL = req.file
		? `/uploads/${req.file.filename}`
		: "/images/default.jpg";

	let user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ profileImageURL },
	);
	const token = signUser(user);
	res.clearCookie("JWT");
	res.cookie("JWT", token);

	res.redirect("/profile");
}

export { handleSignin, handleSignup, handleSignout, handleUploadProfile };
