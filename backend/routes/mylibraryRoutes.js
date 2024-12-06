const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const Book = require('../models/Book'); 


const authenticateToken = (req,res,next) => {
    const token = req.cookies.authToken; 

    if (!token) {
        return res.status(401).json({ message: "No Token"});
    }
    try{
        const decoded = jwt.verify(token, '10');
        req.user = decoded;
        next();
    } catch(err)
    {
        return res.status(403).json({message:"Authenticate Fail"});
    }
}

router.get("/", authenticateToken, async (req,res) => {
    try{
        const userId = req.user.userId;
    
        const currentUser = User.findOne({_id: (userId)});
        const bookIds = currentUser.books;
        const books = await Book.find({_id: {$in:bookIds}});

        res.status(200).json({books});
    } catch(err){
        res.status(500).json({ message: "Book Data Loading Fail" });
    }
});

module.exports = router;
