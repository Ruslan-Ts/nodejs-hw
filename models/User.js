import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";
import { runValidatorsAtUpdate } from "./hooks.js";
import Joi from "joi";

const userSchema = new Schema(
	{
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: 6,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		avatarURL: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			default: null,
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);
userSchema.post("save", handleSaveError);

export const userRegisterSchema = Joi.object({
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	password: Joi.string().min(6).required(),
});
export const userLoginSchema = Joi.object({
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);
export default User;
