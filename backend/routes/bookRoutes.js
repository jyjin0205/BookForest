const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); 

router.get('/', async (req, res) => {
    try {
        console.log("Fetching posts...");
        const posts = await Book.find();
        res.status(200).json(posts); 
        console.log(posts);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

router.get('/search', async(req,res)=>{
    const {userinput} = req.query;
    try{
        const results = await Book.find({
            $or: [
                {title: {$regex: userinput, $options: "i"}},
                {author: {$regex: userinput, $options:"i"}}
            ]
        });
        console.log(results);

        res.status(200).json({books:results});

    } catch(error){
        res.status(500).json({error:"Failed to search books"});
    }

});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log("Fetching book contents... id:" + id);
        const books = await Book.findOne({ _id: id }); 
        if (!books) {
            return res.status(404).json({ error: "Book not found" }); 
        }
        res.status(200).json(books); 
    } catch (error) {
        console.error("Error fetching book contents:", error);
        res.status(500).json({ error: "Failed to fetch book contents" });
    }
});



module.exports = router;

