const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const productModel= require('../models/productModel');
const auth=require('../auth')

router.get('/',function(req,res)
{
    productModel.find()
    .select('-__v ')
    .exec()
    
    .then(products=>{
        res.json(products).status(200);
    })
});




router.post('/',auth,function(req,res)
{
    const newProduct = new productModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
    newProduct.save();
    res.send("Product added successfully").status(201);
});


router.get('/:productID',function(req,res)
{
    const id=req.params.productID;
    productModel.findById(id)
    .exec()
    .then(product=>{
        res.json(product).status(200);
    })

})



router.put('/:productID',auth,function(req,res)
{
    const id=req.params.productID;
    const newPrice=req.body.price;
    productModel.updateOne({_id:id},{$set:{price:newPrice}})
    .exec()
    .then(product=>{
        res.json(product).status(200);
    })

})

router.delete('/:productID',auth,function(req,res)
{
    const id=req.params.productID;
    productModel.deleteOne({_id:id})
    .exec()
    .then(object=>{
        res.json(object).status(200);
    })
})


module.exports=router;

