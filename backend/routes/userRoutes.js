const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const Book = require('../models/Book'); 

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

const authenticateToken = (req,res,next) => {
    const token = req.cookies.autoToken; 

    if (!token) {
        req.user = null;
        next();
    }
    try{
        const decoded = jwt.verify(token, '10');
        req.user = decoded;
        next();
    } catch(err)
    {
        req.user = null;
        next();
    }
}

router.get('/detail/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log("Fetching book contents... id:" + id);
        const books = await Book.findOne({ _id: id }); 
        if (!books) {
            return res.status(404).json({ error: "Book not found" }); 
        }
        else {

            const token = req.cookies.autoToken;
            const decoded = jwt.verify(token, '10');

            const userId = decoded.userId;
            const checkUser = await User.findOne({_id: (userId)});   
            if(checkUser)
            {
                return res.status(200).json({exists: true, userId:userId, book:books});
            }

        }
    } catch (error) {
        console.error("Error fetching book contents:", error);
        res.status(500).json({ error: "Failed to fetch book contents" });
    }
});

router.get('/userInfo',authenticateToken, async(req,res)=>{
    try{
        if(!req.user)
        {
            return res.status(200).json({exists:false});
        }
        const userId = req.user.userId;
        const checkUser = await User.findOne({_id: (userId)});   
         
        if(checkUser)
            return res.status(200).json({exists: true, userId:userId, nickname:checkUser.nickname});
        else
            return res.status(200).json({exists: false});

    } catch(error){
        return res.status(401).json({message:'Error when checking Id existance'});
    }
});


router.get('/idcheck',async (req,res)=>{
    try{
        const {userid} = req.query;
        const checkUser = await User.findOne({_id: (userid)});   
         
        
        if(checkUser)
            return res.status(200).json({exists: true});
        else
            return res.status(200).json({exists: false});

    } catch(error){
        return res.status(401).json({message:'Error when checking Id existance'});
    }
});


router.get('/myinfo',(req,res)=>{
    const token = req.cookies.autoToken;

    if(!token){
        return res.status(401).json({message: 'Cannot see info'});
    }

    try{
        const decoded = jwt.verify(token, '10');
        res.status(200).json({user: decoded});
    } catch(error) {
        return res.status(401).json({message: 'Invalid token'});
    }
});

router.post('/alreadyassign',async(req,res)=>{
    try{
        const {userId, bookId} = req.body;

        console.log(userId, bookId);

        const currentUser = await User.findOne({_id: (userId)});
        const currentBook = await Book.findOne({_id:bookId});

        if(!currentUser)
            return res.status(404).json({message: "User not found"});

        if(!currentBook)
            return res.status(404).json({message: "Book not found"});

        if(currentUser.books.includes(bookId))
            return res.status(200).json({assigned:true});   
        else
            return res.status(200).json({assigned:false});   

    }catch(error){
        console.log(error);
        return res.status(401).json({message: "Error Checking"});
    }
});

router.post('/assign',async(req,res)=>{
    try{
        const {userId, bookId} = req.body;
        const currentUser = await User.findOne({_id: (userId)});
        const currentBook = await Book.findOne({_id:bookId});

        if(!currentUser)
            return res.status(404).json({message: "User not found"});

        if(!currentBook)
            return res.status(404).json({message: "Book not found"});

        currentUser.books.push(bookId);

        await currentUser.save();

        return res.status(200).json({message: "Book assigned successfully"});        


    }catch(error){
        console.log(error);
        return res.status(401).json({message: "Error Assigining"});
    }
});


router.post('/register', async(req,res)=>{
    try{
        const {userid, userpw, userlostkey, nickname, email} = req.body;

        const hashedPassword = await bcrypt.hash(userpw,10);
        const hashedLostKey = await bcrypt.hash(userlostkey,5);

        const newUser = new User({_id:userid,hashedPassword:hashedPassword,hashedLostKey:hashedLostKey,nickname:nickname,email:email });
        await newUser.save();

        res.status(201).send('User registered');

    } catch(error){
        res.status(500).send('Error registering');
    }
});

//login API
router.post('/login', async(req,res)=>{
    try{
        const {userid, userpw} = req.body;

        const currentUser = await User.findOne({_id: (userid)});
        console.log("log");
        console.log(currentUser);
        if(!currentUser)
            return res.status(401).json({message: "Invalid username"});
        const isPasswordValid = await bcrypt.compare(userpw,currentUser.hashedPassword);
        if(!isPasswordValid)
            return res.status(401).send({message: "Invalid password"});

        const token = jwt.sign(
            {userId: userid, userNickname:currentUser.nickname},
            '10', // secret key
            {expiresIn: '1h'}
        );

        res.cookie('autoToken',token,{
            maxAge: 60*60*1000,
            secure: false,
        });

        res.status(200).json({message:'Login successful'})

    } catch(error) {
        res.status(500).send('Error logging in');
    }
});


module.exports = router;
