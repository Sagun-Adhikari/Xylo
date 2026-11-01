const Post = require("../models/postModel");

// CREATE POST
async function createPost(req, res) {
    const { content } = req.body;

    if (!content || !content.trim()) {
        return res.status(400).json({
            message: "Post content is required"
        });
    }

    const newPost = await Post.create({
        content: content,
        author: req.user.id
    });

    const post = await Post.findById(newPost._id)
        .populate("author", "username profilePicture");

    res.status(201).json({
        message: "Post created successfully",
        post: post
    });
}

// GET ALL POSTS
async function getPosts(req, res) {
    const posts = await Post.find()
        .populate("author", "username profilePicture")
        .sort({ createdAt: -1 });

    res.status(200).json({
        posts: posts
    });
}

module.exports = { createPost, getPosts };