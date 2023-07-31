import { HttpError } from "../helpers/index.js";

const allowedSubscriptions = ["starter", "pro", "business"];

const isValidSubscription = (req, res, next) => {
  const { subscription } = req.body;

  if (!allowedSubscriptions.includes(subscription)) {
    next(HttpError(400, "Invalid subscription value"));
  }

  next();
};

export default isValidSubscription;
