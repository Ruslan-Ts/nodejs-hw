// const fs = require('fs/promises')
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContact = (contacts) =>
	fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
	const buffer = await fs.readFile(contactsPath);
	return JSON.parse(buffer);
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const result = contacts.find((contact) => contact.id === contactId);
	return result || null;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = contacts.splice(index, 1);
	await updateContact(contacts);
	return result;
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await updateContact(contacts);
	return newContact;
};

// const updateContact = async (contactId, body) => {};

export default {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
