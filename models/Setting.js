import { Schema, model } from "mongoose";

const UserSchema = new Schema(
	{
		userId: { type: String, required: true },
		phone: { type: String, required: true, unique: true },
		bio: { type: String, required: true },
		country: { type: String, required: true },
	},
	{ timestamps: true }
);

const User = model("User", UserSchema);
export default User;
