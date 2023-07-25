import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import contactsSchema from "../../schemas/contacts-schema.js";
import { validateBody } from "../../decorators/index.js";
import {
  isEmptyBody,
  isEmptyStatus,
  isValidId,
} from "../../middlewars/index.js";

const router = express.Router();

router.get("/", contactsController.getList);

router.get("/:contactId", isValidId, contactsController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.add
);

router.delete("/:contactId", isValidId, contactsController.deleteById);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.updateById
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyStatus,
  validateBody(contactsSchema.contactUpdateStatusSchema),
  contactsController.updateStatusContact
);

export default router;
