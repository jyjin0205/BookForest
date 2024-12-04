const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.json('Hello from the Backend!');
});

router.get('/myinfo',(req,res)=>{
    const token = req.cookies.autoToken;

    if(!token){
        return res.status(401).json({message: 'Cannot see info'});
    }

    try{
        const decoded = jwt.verify(token, 10);
        res.status(200).json({user: decoded})
    } catch(error) {
        return res.status(401).json({message: 'Invalid token'})
    }
});

//register API
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

        const currentUser = User.findOne({_id: (userid)});
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
        });

        res.status(200).json({message:'Login successful'})

    } catch(error) {
        res.status(500).send('Error logging in');
    }
});

module.exports = router;
