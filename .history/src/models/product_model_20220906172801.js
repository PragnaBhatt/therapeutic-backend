const mongoose =require('mongoose')
const foodSchema=mongoose.Schema({

category:{
    type:mongoose.Schema.ObjectId
    
}


});
module.exports=mongoose.model('FoodModel',foodSchema);
