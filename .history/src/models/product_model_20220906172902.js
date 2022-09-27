const mongoose =require('mongoose')
const foodSchema=mongoose.Schema({

// category:{
//     type:mongoose.Schema.ObjectId
//     ref
// }
name:{
    type:String,
    required:true,
    minlength:3,
    maxlength:
}

});
module.exports=mongoose.model('FoodModel',foodSchema);
