import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function (req, res, next) {
	const token = req.cookies.token;
	if (!token) {
		next();
		return;
	}

	const decode = jwt.verify(token, process.env.JWT_SECRET);
	const user = await User.findById(decode.userId);
	req.user = user;
	req.userId = user ? user._id : null;
	next();
}
