import { Router } from "express";
const router = Router();

router.get("/settings", (req, res) => {
	res.render("settings", {
		title: "SETTINGS | FarruxDEV",
		loginError: req.flash("loginError"),
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
