import jsonwebtoken from "jsonwebtoken";

const secret = "Bl0g!fy";

function signUser(user) {
	const payload = {
		_id: user._id,
		email: user.email,
		userName: user.fullName.split(" ")[0],
		profileImageURL: user.profileImageURL,
		role: user.role,
	};
	const token = jsonwebtoken.sign(payload, secret);
	return token;
}

function verifyToken(token) {
	const payload = jsonwebtoken.verify(token, secret);
	return payload;
}

export { signUser, verifyToken };
