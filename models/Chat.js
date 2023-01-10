import { Schema, model } from "mongoose";

const ChatSchema = new Schema(
	{
		userId: { type: String, required: true },
		userName: { type: String, required: true },
		userImage: { type: String, required: true },
		content: { type: String, required: true },
	},
	{ timestamps: true }
);

const Chat = model("Chat", ChatSchema);
export default Chat;
