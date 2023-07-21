import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import contactsSchema from "../../schemas/contacts-schema.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody } from "../../middlewars/index.js";

const router = express.Router();

router.get("/", contactsController.getList);

router.get("/:contactId", contactsController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.add
);

router.delete("/:contactId", contactsController.deleteById);

router.put(
  "/:contactId",
  isEmptyBody,
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.updateById
);

export default router;
