import express from "express";
import Joi from "joi";

import contactsService from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";

const router = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z\s-]+$/)
    .required()
    .messages({
      "any.required": "Missing required name field",
      "string.pattern.base":
        'The name field must contain only letters, spaces, and dashes',
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
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }

});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Missing fields");
    }
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;

    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
