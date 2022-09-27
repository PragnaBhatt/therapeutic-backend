const mongoose =require('mongoose')
const foodSchema=mongoose.Schema({

category:{
    type:mongoose.Schema.ObjectId
    re
}


});
module.exports=mongoose.model('FoodModel',foodSchema);
