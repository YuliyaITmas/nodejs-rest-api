import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Missing required email field",
    "string.pattern.base":
      "Invalid email format.Please make sure you've entered a correct email with the '@' symbol and a valid domain name (e.g., example@example.com).",
  }),
  password: Joi.string().min(6).required()
  .messages({
    "any.required": "Missing required password field",
    "string.min":
     "Password length must be at least 6 characters long",
  }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export default {
  userRegisterSchema,
  userLoginSchema,
};
