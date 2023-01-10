import express from "express";
import { create } from "express-handlebars";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import hbsHelpers from "./utils/index.js";

// MIDLEWARES
import varMiddleware from "./middleware/var.js";
import userMiddleware from "./middleware/user.js";

// ROUTES
import AdminRoutes from "./routes/admin.js";
import AdminProductRoutes from "./routes/adminProducts.js";
import AuthRoutes from "./routes/auth.js";
import UserRoutes from "./routes/user.js";
import ProductsRoutes from "./routes/products.js";
import session from "express-session";

dotenv.config();

const app = express();

const hbs = create({
	defaultLayout: "main",
	extname: "hbs",
	helpers: hbsHelpers,
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
	session({ secret: "FarruxDEV", reserve: false, saveUninitialized: false })
);
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

app.use(AuthRoutes);
app.use(AdminRoutes);
app.use(AdminProductRoutes);
app.use(ProductsRoutes);
app.use(UserRoutes);

const startApp = () => {
	try {
		mongoose.set("strictQuery", false);
		mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () =>
			console.log("Mongo DB connected")
		);

		const PORT = process.env.PORT || 7000;
		app.listen(PORT, () => console.log(`Server is running ${PORT}`));
	} catch (error) {
		console.log(error);
	}
};
startApp();
