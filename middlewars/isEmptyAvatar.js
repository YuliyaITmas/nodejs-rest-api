import { HttpError } from "../helpers/index.js";

const isEmptyAvatar = (req, res, next) => {
  if (!req.file) {
    next(HttpError(400, "Avatar must be provided"));
  }
  next();
};

export default isEmptyAvatar;
