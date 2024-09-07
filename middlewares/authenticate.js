import { verifyToken } from "../utils/JWT.js";

function authenticateCookie(cookie_name) {
	return (req, res, next) => {
		let JWT = req.cookies[cookie_name];
		// console.log("jwt", JWT);

		if (!JWT) return next();

		const payload = verifyToken(JWT);
		if (!payload) return next();

		req.user = payload;
		// console.log("payload:", payload);

		return next();
	};
}

export { authenticateCookie };
