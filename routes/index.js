const express = require("express");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();
const user = require("../controller/userController");
const checklist = require("../controller/checklistController");

router.post("/register", user.register);
router.post("/login", user.requestToken);
router.use(authentication);
router.get("/checklist", checklist.getAllChecklist);
router.post("/checklist", checklist.createNewChecklist);
router.delete("/checklist/:checklistId", checklist.deleteChecklistById);

module.exports = router;
