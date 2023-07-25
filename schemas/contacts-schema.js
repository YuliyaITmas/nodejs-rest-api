import Joi from "joi";
const contactsAddSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z\s-]+$/)
    .required()
    .messages({
      "any.required": "Missing required name field",
      "string.pattern.base":
        "The name field must contain only letters, spaces, and dashes",
    }),
  email: Joi.string().email().required().messages({
    "any.required": "Missing required email field",
    "string.email": "The email field must be a valid email address",
  }),
  phone: Joi.string()
    .pattern(/^[\d\s()+-]+$/)
    .required()
    .messages({
      "any.required": "Missing required phone field",
      "string.pattern.base":
        "The phone field must contain only digits, spaces, parentheses, plus signs, and hyphens",
    }),
  favorite: Joi.boolean(),
});

const contactUpdateStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "boolean.base": "The favorite field must be a boolean",
  }),
});
export default {
  contactsAddSchema,
  contactUpdateStatusSchema,
};
