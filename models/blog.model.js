import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		coverImageURL: {
			type: String,
			required: false,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true },
);

export const Blog = model("Blog", blogSchema);
