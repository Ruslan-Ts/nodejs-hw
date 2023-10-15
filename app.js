// const express = require('express')
import express from "express";
// const logger = require("morgan");
import logger from "morgan";
// const cors = require("cors");
import cors from "cors";
import contactsRouter from "./routes/api/contacts-router.js";

// const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
	console.log("middleware404");
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

export default app;
// module.exports = app;
