const foodModel = require("../models/food_model");
const asyncWrapper = require("../middlewares/asyncWrappers");
var random = require("mongoose-random");
const { StatusCodes } = require("http-status-codes");

const fetchFoodProducts = asyncWrapper(async (req, res, next) => {
  //var skip = Date.now() / 9;

  var data={};
if(req.body.type){
data = await foodModel .find({type}) .limit(10) .skip(1) .sort({ updatedAt: -1 });

}

   data = await foodModel
    .find({})
    .limit(10)
    .skip(1)
    .sort({ updatedAt: -1 });

  res.status(StatusCodes.OK).json({ total: data.length, data });
});

const addFoodProducts = asyncWrapper(async (req, res, next) => {
  await foodModel.insertMany(req.body);

  res.status(StatusCodes.CREATED).json({ status: 1, message: "inserted !!" });
});
const updateTimeFoodProducts = asyncWrapper(async (req, res, next) => {
  const update = await foodModel.updateMany({}, { inc: "1" });

  res.status(StatusCodes.CREATED).json({ status: 1, message: update });
});

module.exports = {
  fetchFoodProducts,
  addFoodProducts,
  updateTimeFoodProducts,
};
