const mongoose =require('mongoose')
const foodSchema=mongoose.Schema({

// category:{
//     type:mongoose.Schema.ObjectId
//     ref
// }
name:{
    type:String,
    
}

});
module.exports=mongoose.model('FoodModel',foodSchema);
