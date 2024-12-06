const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); 

// get all posts
router.get('/', async (req, res) => {
    try {
        console.log("Fetching posts...");
        const posts = await Post.find(); 
        res.status(200).json(posts); 
        console.log(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

module.exports = router;
