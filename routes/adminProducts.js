import { Router } from "express";
import User from "../models/User.js";
import authAdminMiddleware from "../middleware/authAdmin.js";
import Product from "../models/Product.js";
const router = Router();

router.get("/admin/products", authAdminMiddleware, async (req, res) => {
	let allUsers = await User.find().lean();
	let allProducts = await Product.find().lean();

	for (let i in allUsers) {
		allUsers[i]["products"] = [];
		for (let j in allProducts) {
			if (allProducts[j].user.equals(allUsers[i]._id)) {
				allUsers[i]["products"].push(allProducts[j]);
			}
		}
	}
	res.render("admin/products", {
		isAdmin: true,
		isProduct: true,
		admin: req.admin,
		allUsers: allUsers,
		allUsersSize: allUsers.length,
		allProductsSize: allProducts.length,
	});
});

router.post(
	"/admin/products/delete/:id",
	authAdminMiddleware,
	async (req, res) => {
		let productId = req.params.id;
		let allProducts = await Product.findByIdAndDelete(productId);
		res.redirect("/admin/products/");
	}
);

export default router;
