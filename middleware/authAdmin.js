import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function (req, res, next) {
	const token = req.cookies.token;
	if (!token) {
		res.redirect("/login");
		return;
	}
	const decode = jwt.verify(token, process.env.JWT_SECRET);
	const user = await User.findById(decode.userId).lean();
	if (user.role == "user") {
		res.redirect("/");
		return;
	}
	req.admin = user;

	next();
}
