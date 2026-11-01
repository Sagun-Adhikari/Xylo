const express = require("express");
const router = express.Router();

const { getUsers } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getUsers);

module.exports = router;