const diseasesModel = require("../models/diseases_model");
const asyncWrapper = require("../middlewares/asyncWrappers");
const { StatusCodes } = require("http-status-codes");
const { populate } = require("../models/diseases_model");

const addDiseases = asyncWrapper(async (req, res, next) => {
  await diseasesModel.insertMany(req.body);

  res.status(StatusCodes.CREATED).json({ status: 1, message: "inserted !!" });
});

// const updateTimeFoodProducts = asyncWrapper(async (req, res, next) => {
// const update = await foodModel.updateMany(
//     { name: { $regex: /na$/i } },
//     { inc: "-" }
// );

// res.status(StatusCodes.CREATED).json({ status: 1, message: update });
// });

// update fav status

// get all categories/types

const fetch = asyncWrapper(async (req, res, next) => {
  // var skip = Date.now() / 9;
  var match = {};
  console.log("req.body.diseases " + req.params.diseases);
  console.log("req.body " + req.body.diseases);

  if (req.body.diseases) {
    match = {
      diseases: req.body.diseases,
    };
  }
  console.log("in diseasesModel else");
  data = await diseasesModel
    // .populate({ path: "food" })

    .aggregate([
      {
        $match: match,
      },
      // {
      //   $lookup: {
      //     from: "FoodModel",
      //     localField: "diseases",
      //     foreignField: "name",
      //     as: "diseases", // alias
      //   },
      // },
    ]);
  // .sort({ noOfViews: -1 });

  res.status(StatusCodes.OK).json({ data });
});
const fetchData = asyncWrapper(async (req, res, next) => {
  // var skip = Date.now() / 9;
  var match = {};
  console.log("req.params.diseases " + req.params.diseases);

  if (req.params.diseases) {
    match = {
      diseases: req.params.diseases,
    };
  }
  console.log("in diseasesModel else");
  data = await diseasesModel
    // .populate({ path: "food" })

    .aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: "$diseases",

          //   image: {
          //     $first: "$image",
          //   },
          total: {
            $sum: 1,
          },
        },
      },

      {
        $project: {
          name: "$_id",
          total: "$total",
          _id: false,
          //image: true,
        },
      },
    ])
    .sort({ noOfViews: -1 });

  res.status(StatusCodes.OK).json({ total: data.length, data });
});
module.exports = {
  addDiseases,
  fetch,
};
