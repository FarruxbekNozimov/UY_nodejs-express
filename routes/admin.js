import { Router } from "express";
import User from "../models/User.js";
import authAdminMiddleware from "../middleware/authAdmin.js";
import Product from "../models/Product.js";
import { hashing, unhashing } from "../services/hashing.js";
import emoji from "node-emoji";
import Chat from "../models/Chat.js";
const router = Router();

router.get("/admin", authAdminMiddleware, async (req, res) => {
	let allUsersSize = await User.find().lean();
	let allProductsSize = await Product.find();
	let adminsSize = 0;
	let ownersSize = 0;
	for (const i in allUsersSize) {
		if (allUsersSize[i].role == "admin") adminsSize++;
		if (allUsersSize[i].role == "owner") ownersSize++;
	}
	res.render("admin/index", {
		isAdmin: true,
		isIndex: true,
		admin: req.admin,
		allUsers: allUsersSize.slice(-3),
		adminsSize,
		ownersSize,
		allUsersSize: allUsersSize.length,
		allProductsSize: allProductsSize.length,
	});
});

router.get("/admin/users", authAdminMiddleware, async (req, res) => {
	let allUsers = await User.find().lean();
	let allProducts = await Product.find();
	for (let i in allUsers) {
		allUsers[i].password = unhashing(allUsers[i].password);
	}

	res.render("admin/users", {
		isAdmin: true,
		isUser: true,
		admin: req.admin,
		allUsers: allUsers,
		allProducts,
		allUsersSize: allUsers.length,
		allProductsSize: allProducts.length,
	});
});

router.get("/admin/users/:id", authAdminMiddleware, async (req, res) => {
	let userId = req.params.id;
	let myUser = await User.findById(userId).lean();
	const myProducts = await Product.find({ userId }).populate("user").lean();
	myUser.password = unhashing(myUser.password);

	res.render("admin/about-user", {
		isAdmin: true,
		isUser: true,
		admin: req.admin,
		myUser,
		myProducts,
	});
});

router.get("/admin/users/edit/:id", authAdminMiddleware, async (req, res) => {
	let userId = req.params.id;
	let editUser = await User.findById(userId).lean();
	editUser.password = unhashing(editUser.password);
	res.render("admin/edit-user", {
		isAdmin: true,
		isUser: true,
		editUserError: req.flash("editUserError"),
		admin: req.admin,
		editUser,
	});
});

router.post("/admin/users/edit", authAdminMiddleware, async (req, res) => {
	let { _id, firstName, lastName, email, password, image, role } = req.body;
	if (!firstName || !lastName || !email || !password || !image) {
		req.flash("editUserError", "All fields are required");
		res.redirect(`/admin/users/edit/${_id}`);
		return;
	}
	password = hashing(password);
	const product = await User.findByIdAndUpdate(
		_id,
		{ ...req.body, password },
		{ new: true }
	);
	res.redirect("/admin/users");
});

router.post(
	"/admin/users/delete/:id",
	authAdminMiddleware,
	async (req, res) => {
		const id = req.params.id;
		let products = await Product.find();
		for (let i in products) {
		}

		let user = await User.findByIdAndDelete(id);

		res.redirect("/admin/users");
	}
);

router.get("/admin/chats", authAdminMiddleware, async (req, res) => {
	let allChatMsgs = await Chat.find().lean();

	res.render("admin/chats", {
		isAdmin: true,
		isChat: true,
		allChatMsgs,
		admin: req.admin,
		emoji: emoji.emoji,
	});
});

router.post("/admin/chats", authAdminMiddleware, async (req, res) => {
	let { content } = req.body;
	content = content.trim();
	if (!content) {
		res.redirect("/admin/chats");
		return;
	}
	let chatMsg = {
		userId: req.admin._id,
		userName: req.admin.firstName + " " + req.admin.lastName,
		userImage: req.admin.image,
		content: content,
	};
	const chatMesssage = await Chat.create(chatMsg);
	res.redirect("/admin/chats");
});

export default router;
