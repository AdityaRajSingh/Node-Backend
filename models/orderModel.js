const mongoose= require('mongoose');
const orderSchema= mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product',
    required:true
},
quantity:{
    type:Number,
    default: 1
},
time:{
    type:Date,
    default:Date.now
}

});
//ye ek model hai USER ka 
module.exports=mongoose.model('Order',orderSchema);
