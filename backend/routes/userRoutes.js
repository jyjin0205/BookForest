const express = require('express');
const router = express.Router();
const User = require('../models/User'); 


router.get('/', async (req, res) => {
    try {
        console.log("Fetching users...");
        const posts = await User.find(); // 모든 데이터 가져오기
        console.log(posts);
        res.status(200).json(posts); // 데이터를 JSON 형식으로 반환
        // res.json({ message: "Hello from the Backend!"});
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});


module.exports = router;
