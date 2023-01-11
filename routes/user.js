import { Router } from "express";
const router = Router();
import AuthMiddleware from "../middleware/auth.js";

router.get("/settings", AuthMiddleware, (req, res) => {
	res.render("settings", {
		title: "SETTINGS | FarruxDEV",
		loginError: req.flash("loginError"),
		user: req.user,
		userName: req.user ? req.user.firstName : null,
		userImage: req.user ? req.user.image : null,
	});
});

router.get("*", function (req, res) {
	res.render("notFound", {
		title: "404 NOT FOUND | FarruxDEV",
	});
});

export default router;
