const mongoose =require('mongoose')
const foodSchema=mongoose.Schema({

category:{
    type:mongoose.Types.ObjectId
}


});
module.exports=mongoose.model('FoodModel',foodSchema);
