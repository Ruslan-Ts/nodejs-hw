import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";
import { runValidatorsAtUpdate } from "./hooks.js";
import Joi from "joi";

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);
contactSchema.post("save", handleSaveError);

export const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});
export const contactUpdateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

export default Contact;
