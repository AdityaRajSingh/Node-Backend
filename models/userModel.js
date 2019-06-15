const mongoose= require('mongoose');
const userSchema= mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
name: {type: String,required:true},
email: {type: String, required:true, unique:true},
password: {type: String, required:true}

});
//ye ek model hai USER ka 
module.exports=mongoose.model('User',userSchema);
