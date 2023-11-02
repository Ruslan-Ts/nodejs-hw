import fs from "fs/promises";
import path from "path";
import User from "../models/User.js";
import HttpError from "../helpers/HttpErrors.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Jimp from "jimp";
import gravatar from "gravatar";

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, `${email} is already exist`);
	}
	const avatarURL = gravatar.url(email);
	const hashPassword = await bcrypt.hash(password, 10);
	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
	});
	res.status(201).json({
		email: newUser.email,
		subscription: newUser.subscription,
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "email or password invalid");
	}
	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, "email or password invalid");
	}

	const payload = { id: user._id };

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token: token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
};

const getCurrent = async (req, res) => {
	const user = req.user;
	res.json({
		email: user.email,
		subscription: user.subscription,
	});
};

const changeAvatar = async (req, res) => {
	if (!req.file) {
		throw HttpError(400, "Avatar is not found");
	}
	const { _id } = req.user;
	const { path: oldPath, filename } = req.file;
	const newPath = path.join(avatarPath, filename);
	await Jimp.read(oldPath).then((image) => {
		return image.resize(250, 250).write(oldPath);
	});
	await fs.rename(oldPath, newPath);
	const avatarURL = path.join("avatars", filename);
	await User.findByIdAndUpdate(_id, { avatarURL });
	res.status(200).json({ avatarURL });
};

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });
	res.status(204).json({ message: "Logout success!" });
};

export default {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	getCurrent: ctrlWrapper(getCurrent),
	changeAvatar: ctrlWrapper(changeAvatar),
	logout: ctrlWrapper(logout),
};
