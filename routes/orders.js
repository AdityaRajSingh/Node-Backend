const express=require('express');
const router=express.Router();
const mongoose=require('mongoose')

const orderModel= require('../models/orderModel')

const auth=require('../auth')

router.get('/',function(req,res)
{
    res.send("Orders Home").status(200);
});

router.post('/',auth,function(req,res){
const newOrder= new orderModel({
    _id:new mongoose.Types.ObjectId(),
    user:req.body.user,
    product:req.body.product,
    quantity: req.body.quantity,
    time:req.body.time
});

newOrder.save();
res.json("Order Created").status(201);
})


router.get('/:userID',function(req,res){
    const id=req.params.userID;
    orderModel.find({user:id})
    .select('-__v -_id')
    .populate('user','-password -__v')
    .populate('product','-__v')
    .exec()
    .then(orders=>{
        res.json(orders).status(200);
    })
})
module.exports=router;

