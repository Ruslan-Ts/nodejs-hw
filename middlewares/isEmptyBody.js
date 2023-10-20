import HttpError from "../helpers/HttpErrors.js";

const isEmptyBody = (req, res, next) => {
	if (!Object.keys(req.body).length) {
		return next(HttpError(400, "All fields are empty"));
	}
	next();
};

export default isEmptyBody;
