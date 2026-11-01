const express = require("express");
const router = express.Router();

const { createPost, getPosts } = require("../controller/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getPosts);

module.exports = router;