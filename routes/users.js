const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const mongoose = require('mongoose');
const userModel = require('../models/userModel');

const jwt=require('jsonwebtoken');

router.get('/', function (req, res) {
    res.send("User's home").status(200);
});

//using bcryptjs :js pure
router.post('/', function (req, res)
 {
    const newUser = new userModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10)
    })


    userModel.find({ email: req.body.email })
        .exec()
        .then(users => 
            {
            if (users.length > 0) {
                res.send("User already exixts").status(400);
            }
            else {
                newUser.save();
                res.send("User Created Successfully").status(201);
            }
        })
});


router.post('/login',function(req,res){
    userModel.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(user==null)
        {
            
            
            res.send("Auth failed").status(401);
        }
        else{
           if(bcryptjs.compareSync(req.body.password,user.password))
           {
               //using synchronous function
               const token=jwt.sign(
                {
                    email:user.email,
                    _id:user._id
            },
            'qwertyu',{
                expiresIn: '1h'
            }
            );


               res.json({
                   "message":"Auth Successfull",
                   "token":token
                   }).status(200);
               
           }
           else{
            res.send("Auth failed").status(401);
           }
        }
    })
});

module.exports = router;