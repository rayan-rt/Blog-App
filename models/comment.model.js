import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		blogID: {
			type: Schema.Types.ObjectId,
			ref: "Blog",
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true },
);

export const Comment = model("Comment", commentSchema);
