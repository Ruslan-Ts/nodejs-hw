import Contact from "../models/Contact.js";
import HttpError from "../helpers/HttpErrors.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAll = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20 } = req.query;
	const skip = (page - 1) * limit;
	const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
		skip,
		limit,
	}).populate("owner", "email subscription");
	res.json(result);
};

const getById = async (req, res) => {
	const { id } = req.params;
	const { _id: owner } = req.user;
	const result = await Contact.findOne({ _id: id }, owner).populate(
		"owner",
		"email subscription"
	);
	// const result = await Contact.findById(id);

	if (!result) {
		throw HttpError(404, `Contact with ${id} not found`);
	}
	res.json(result);
};

const add = async (req, res) => {
	const { _id: owner } = req.user;
	const result = await Contact.create({ ...req.body, owner }).populate(
		"owner",
		"email subscription"
	);
	res.status(201).json(result);
};

const updateById = async (req, res) => {
	const { _id: owner } = req.user;
	const { id } = req.params;
	const result = await Contact.findOneAndUpdate(
		{ _id: id, owner },
		req.body
	).populate("owner", "email subscription");
	if (!result) {
		throw HttpError(404, `Contact with ${id} not found`);
	}
	res.json(result);
};

const removeById = async (req, res) => {
	const { id } = req.params;
	const { _id: owner } = req.user;
	const result = await Contact.findOneAndDelete({ _id: id }).populate(
		"owner",
		"email subscription"
	);
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
