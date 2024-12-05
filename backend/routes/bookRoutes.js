const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); 

router.get('/', async (req, res) => {
    try {
        console.log("Fetching posts...");
        const posts = await Book.find(); // 모든 데이터 가져오기
        res.status(200).json(posts); // 데이터를 JSON 형식으로 반환
        console.log(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

module.exports = router;

