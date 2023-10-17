import contactsService from "../models/contacts.js";
import HttpError from "../helpers/HttpErrors.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAll = async (req, res) => {
	const result = await contactsService.listContacts();
	res.json(result);
};

const getById = async (req, res) => {
	const { id } = req.params;
	const result = await contactsService.getContactById(id);

	if (!result) {
		throw HttpError(404, `Contact with ${id} not found`);
	}
	res.json(result);
};

const add = async (req, res) => {
	const result = await contactsService.addContact(req.body);
	res.status(201).json(result);
};

const updateById = async (req, res) => {
	const { id } = req.params;
	const result = await contactsService.updateContactById(id, req.body);
	if (!result) {
		throw HttpError(404, `Contact with ${id} not found`);
	}
	res.json(result);
};

const removeById = async (req, res) => {
	const { id } = req.params;
	const result = await contactsService.removeContact(id);
	if (!result) {
		throw HttpError(404, `Contact with ${id} not found`);
	}
	res.json({ message: "Delete success!!!" });
};

export default {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	updateById: ctrlWrapper(updateById),
	removeById: ctrlWrapper(removeById),
};
