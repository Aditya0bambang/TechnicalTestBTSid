const express = require("express");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();
const user = require("../controller/userController");

router.post("/register", user.register);
router.post("/login", user.requestToken);
router.use(authentication);

module.exports = router;
