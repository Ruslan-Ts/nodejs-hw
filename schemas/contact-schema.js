import Joi from "joi";

export const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	phone: Joi.string().required(),
});
