import multer from "multer";
import path from "path";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
	destination,
	filename: (req, file, cb) => {
		const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
		const filename = `${uniquePrefix}_${file.originalname}`;
		cb(null, filename);
	},
});

const limits = {
	fileSize: 3 * 1024 * 1024,
};

const fileFilter = (req, res, cb) => {
	if (file.originalname.split(".").pop() === "exe") {
		cb(new Error("Invalid extention"));
	}
	cb(null, true);
};

const upload = multer({
	storage,
	limits,
	// fileFilter,
});

export default upload;
