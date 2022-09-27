const foodModel = require("../models/food_model");
const asyncWrapper = require("../middlewares/asyncWrappers");
var random = require("mongoose-random");
const { StatusCodes } = require("http-status-codes");

const fetchFoodProducts = asyncWrapper(async (req, res, next) => {
  //var skip = Date.now() / 9;
  console.log(req.body);
  console.log(req.body.type);

  var data = {};
  if (req.body.type) {
    console.log("in to type");

    data = await foodModel
      .find({ type: req.body.type })

      .sort({ updatedAt: -1 });
  } else if (req.body.limt) {
    console.log("in to limit");

    data = await foodModel.find({}).limit(10).skip(1).sort({ updatedAt: -1 });
  } else {
    //all data
    console.log("in to else");
    data = await foodModel.find({}).sort({ updatedAt: -1 });
  }
  res.status(StatusCodes.OK).json({ total: data.length, data });
});

const addFoodProducts = asyncWrapper(async (req, res, next) => {
  await foodModel.insertMany(req.body);

  res.status(StatusCodes.CREATED).json({ status: 1, message: "inserted !!" });
});

const updateTimeFoodProducts = asyncWrapper(async (req, res, next) => {
  const update = await foodModel.updateMany(
    { name: { $regex: /na$/i } },
    { inc: "-" }
  );

  res.status(StatusCodes.CREATED).json({ status: 1, message: update });
});
//get all categories/types

const fetchFoodTypes = asyncWrapper(async (req, res, next) => {
  // var skip = Date.now() / 9;

  console.log("in to else");
  data = await foodModel
    .find({})
    .aggregate([
      {
        $group: {_id},
      },
    ])
    .sort({ updatedAt: -1 });

  res.status(StatusCodes.OK).json({ total: data.length, data });
});

module.exports = {
  fetchFoodProducts,
  addFoodProducts,
  updateTimeFoodProducts,
};
