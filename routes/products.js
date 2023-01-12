import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";
import user from "../middleware/user.js";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";
const router = Router();

router.get("/", user, (req, res) => {
	res.render("index", {
		title: "UY APP | FarruxDEV",
		isHome: true,
		userName: req.user ? req.user.firstName : null,
		userRole: req.user ? req.user.role : null,
		userImage: req.user ? req.user.image : null,
	});
});

router.get("/about", (req, res) => {
	res.render("about", {
		title: "ABOUT | FarruxDEV",
		isAbout: true,
		userName: req.user ? req.user.firstName : null,
		userRole: req.user ? req.user.role : null,
		userImage: req.user ? req.user.image : null,
	});
});

router.get("/products", async (req, res) => {
	const products = await Product.find().populate("user").lean();
	res.render("products", {
		title: "UYLAR | FarruxDEV",
		isProducts: true,
		userId: req.userId ? req.userId.toString() : null,
		products: products,
		userName: req.user ? req.user.firstName : null,
		userRole: req.user ? req.user.role : null,
		userImage: req.user ? req.user.image : null,
	});
});

router.get("/product/:id", async (req, res) => {
	const id = req.params.id;
	const product = await Product.findById(id).populate("user").lean();
	res.render("product", {
		title: "UYLAR | FarruxDEV",
		userId: req.userId ? req.userId.toString() : null,
		product: product,
		userName: req.user ? req.user.firstName : null,
		userRole: req.user ? req.user.role : null,
		userImage: req.user ? req.user.image : null,
	});
});

router.get("/add", authMiddleware, (req, res) => {
	res.render("add", {
		title: "ADD UY | FarruxDEV",
		isAdd: true,
		productError: req.flash("productError"),
		userName: req.user ? req.user.firstName : null,
		userRole: req.user ? req.user.role : null,
		userImage: req.user ? req.user.image : null,
	});
});

router.get("/contact", (req, res) => {
	res.render("contact", {
		title: "CONTACT | FarruxDEV",
		isContact: true,
		userName: req.user ? req.user.firstName : null,
		userRole: req.user ? req.user.role : null,
		userImage: req.user ? req.user.image : null,
	});
});

router.get("/my-products", async (req, res) => {
	const user = req.userId ? req.userId.toString() : null;
	const myProducts = await Product.find({ user }).populate("user").lean();
	res.render("myProducts", {
		title: "MY PRODUCTS | FarruxDEV",
		myProducts: myProducts,
		userName: req.user ? req.user.firstName : null,
		userRole: req.user ? req.user.role : null,
		userImage: req.user ? req.user.image : null,
	});
});

router.get("/edit-product/:id", async (req, res) => {
	const id = req.params.id;
	const product = await Product.findById(id).populate("user").lean();

	res.render("edit-product", {
		title: "UYLAR | FarruxDEV",
		product: product,
		productUpError: req.flash("productUpError"),
		userId: req.userId ? req.userId.toString() : null,
		userName: req.user ? req.user.firstName : null,
		userRole: req.user ? req.user.role : null,
		userImage: req.user ? req.user.image : null,
	});
});

router.post("/add-products", userMiddleware, async (req, res) => {
	const { title, description, image, price } = req.body;
	if (!title || !description || !image || !price) {
		req.flash("productError", "All fields are required");
		res.redirect("/add");
		return;
	}
	const products = await Product.create({
		...req.body,
		user: req.userId,
	});
	res.redirect("/products");
});

router.post("/edit-product", async (req, res) => {
	const { id, title, description, image, price } = req.body;
	if (!title || !description || !image || !price) {
		req.flash("productUpError", "All fields are required");
		res.redirect(`/edit-product/${id}`);
		return;
	}
	const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

	res.redirect("/products");
});

router.post("/delete-product/:id", async (req, res) => {
	const id = req.params.id;
	await Product.findByIdAndDelete(id);
	res.redirect("/products");
});

export default router;
