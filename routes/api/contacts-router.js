// const express = require("express");
import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import validateBody from "../../decorators/validateBody.js";
import { contactAddSchema } from "../../schemas/contact-schema.js";

const contactAddValidate = validateBody(contactAddSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", contactsController.getById);

contactsRouter.post("/", contactAddValidate, contactsController.add);

contactsRouter.put("/:id", contactAddValidate, contactsController.updateById);

contactsRouter.delete("/:id", contactsController.removeById);

// module.exports = router;
export default contactsRouter;
