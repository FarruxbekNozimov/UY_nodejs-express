import { Router } from "express";
const router = Router();
import User from "../models/User.js";
import { generateJWTtoken } from "../services/token.js";
import { hashing, unhashing } from "../services/hashing.js";
import downloadImg from "../utils/downloadImg.js";

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
	let dateNow = new Date().getTime();
	let download = downloadImg(image, "img/" + dateNow + ".jpeg", () =>
		console.log("Image downloading...")
	);
	if (!download) {
		req.flash("registerError", "Image is not available");
		res.redirect("/register");
		return;
	}
	if (!firstname || !lastname || !email || !password) {
		req.flash("registerError", "All fields are required");
		res.redirect("/register");
		return;
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
		image: "/img/" + new Date().getTime() + ".jpeg",
		role: "user",
	};
	const user = await User.create(userData);
	const token = generateJWTtoken(user._id);
	res.cookie("token", token, { httpOnly: true, secure: true });
	res.redirect("/");
});

export default router;
