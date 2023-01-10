import { Router } from "express";
import User from "../models/User.js";
const router = Router();
import { generateJWTtoken } from "../services/token.js";
import { hashing, unhashing } from "../services/hashing.js";

router.get("/login", (req, res) => {
	req.cookies.token ? res.redirect("/") : "";
	res.render("login", {
		title: "LOGIN | FarruxDEV",
		isLogin: true,
		loginError: req.flash("loginError"),
	});
});

router.get("/logout", (req, res) => {
	res.clearCookie("token");
	res.redirect("/login");
});

router.get("/register", (req, res) => {
	req.cookies.token ? res.redirect("/") : "";
	res.render("register", {
		title: "REGISTER | FarruxDEV",
		isRegister: true,
		registerError: req.flash("registerError"),
	});
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		req.flash("loginError", "All fields are required");
		res.redirect("/login");
		return;
	}
	const existUser = await User.findOne({ email: email });
	if (!existUser) {
		req.flash("loginError", "User not found");
		res.redirect("/login");
		return;
	}
	const isPassEqual = password == unhashing(existUser.password);
	if (!isPassEqual) {
		req.flash("loginError", "Password is wrong");
		res.redirect("/login");
		return;
	}
	const token = generateJWTtoken(existUser._id);
	res.cookie("token", token, { httpOnly: true, secure: true });
	res.redirect("/");
});

router.post("/register", async (req, res) => {
	const { firstname, lastname, email, password, image } = req.body;
	if (!firstname || !lastname || !email || !password) {
		req.flash("registerError", "All fields are required");
		res.redirect("/register");
		return;
	}
	if (!image) {
		image =
			"https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
	}
	const condidate = await User.findOne({ email });
	if (condidate) {
		req.flash("registerError", "User already exists");
		res.redirect("/register");
		return;
	}

	const hashedPassword = hashing(password);
	const userData = {
		firstName: firstname,
		lastName: lastname,
		email: email,
		password: hashedPassword,
		image: image,
		role: "user",
	};
	const user = await User.create(userData);
	const token = generateJWTtoken(user._id);
	res.cookie("token", token, { httpOnly: true, secure: true });
	res.redirect("/");
});
export default router;
