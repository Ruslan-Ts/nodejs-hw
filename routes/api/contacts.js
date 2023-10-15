// const express = require("express");
import express from "express";
import contactsService from "../../models/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
	const result = await contactsService.listContacts();
	res.json(result);
});

contactsRouter.get("/:contactId", async (req, res, next) => {
	const result = await contactsService.getContactById();
	res.json(result);
});

contactsRouter.post("/", async (req, res, next) => {
	const result = await contactsService.addContact();
	res.json(result);
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
	const result = await contactsService.removeContact();
	res.json(result);
});

contactsRouter.put("/:contactId", async (req, res, next) => {
	const result = await contactsService.updateContact();
	res.json(result);
});

// module.exports = router;
export default contactsRouter;
