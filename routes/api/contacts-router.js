import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import validateBody from "../../decorators/validateBody.js";
import {
	contactAddSchema,
	contactUpdateFavoriteSchema,
} from "../../models/contact.js";
import isValidId from "../../middlewares/isValidId.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post(
	"/",
	isEmptyBody,
	contactAddValidate,
	contactsController.add
);

contactsRouter.put(
	"/:id",
	isEmptyBody,
	isValidId,
	contactAddValidate,
	contactsController.updateById
);
contactsRouter.patch(
	"/:id/favorite",
	isEmptyBody,
	isValidId,
	contactUpdateFavoriteValidate,
	contactsController.updateById
);

contactsRouter.delete("/:id", isValidId, contactsController.removeById);

export default contactsRouter;
