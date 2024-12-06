const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

//get all users
router.get('/', async (req, res) => {
    try {
        console.log("Fetching users...");
        const posts = await User.find(); 
        console.log(posts);
        res.status(200).json(posts); 
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});


module.exports = router;
