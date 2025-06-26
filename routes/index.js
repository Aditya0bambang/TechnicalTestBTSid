const express = require("express");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();
const user = require("../controller/userController");
const checklist = require("../controller/checklistController");
const todo = require("../controller/todoController");

router.post("/register", user.register);
router.post("/login", user.requestToken);
router.use(authentication);
router.get("/checklist", checklist.getAllChecklist);
router.post("/checklist", checklist.createNewChecklist);
router.delete("/checklist/:checklistId", checklist.deleteChecklistById);
router.get(
  "/checklist/:checklistId/item",
  todo.getAllChecklistItemInChecklistById
);
router.post(
  "/checklist/:checklistId/item",
  todo.createNewChecklistItemInCheckList
);
router.get(
  "/checklist/:checklistId/item/:checklistItemId",
  todo.getChecklistItemInChecklistById
);
router.put(
  "/checklist/:checklistId/item/:checklistItemId",
  todo.updateStatusChecklistItemInChecklistById
);
router.delete(
  "/checklist/:checklistId/item/:checklistItemId",
  todo.deleteItemByChecklistItemId
);
router.put(
  "/checklist/:checklistId/item/rename/:checklistItemId",
  todo.renameItemByChecklistItemId
);

module.exports = router;
