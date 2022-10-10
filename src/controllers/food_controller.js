const foodModel = require("../models/food_model");
const asyncWrapper = require("../middlewares/asyncWrappers");
var random = require("mongoose-random");
const { StatusCodes } = require("http-status-codes");

const fetchFoodProducts = asyncWrapper(async(req, res, next) => {
    //var skip = Date.now() / 9;
    console.log(req.body);
    console.log(req.body.type);
    // var pop = {
    //   path: "noteOfUser", // select: "_id description ",
    //   byUser: req.authUser._id,
    // };
    const byUser = req.authUser._id;

    var data = {};
    if (req.body.type) {
        console.log("in to type");

        data = await foodModel
            .find({ type: req.body.type })
            .populate({ path: "noteOfUser", match: { byUser: req.authUser._id } })

        .select("id name type image description noOfViews")

        .sort({ noOfViews: -1 });
    } else if (req.body.limit) {
        console.log("in to limit " + req.authUser._id);

        data = await foodModel
            .find({})
            //  req.authUser._id != -1 ??
            .populate({
                path: "noteOfUser",
                match: {
                    byUser: req.authUser._id,
                },
            })
            // Garbanzo beans

        .select("id name type image description noOfViews noteOfUser")

        .limit(10)
            .skip(1)
            .sort({ noOfViews: -1 });
    } else if (req.body.id) {
        //perticular item
        console.log("in to id");

        data = await foodModel.findOne({ _id: req.body.id });

        // .populate({
        //   path: "noteOfUser",
        //   match: {
        //     byUser: req.authUser._id,
        //   },
        // });
        //  .select("id name type image description noOfViews");
    } else if (req.body.name) {
        //perticular item
        console.log("in to name");

        data = await foodModel.findOne({ name: req.body.name });
        //.
        // populate({
        //   path: "noteOfUser",
        //   match: {
        //     byUser: req.authUser._id,
        //   },
        // });
        // .select("id name type image description noOfViews");
    } else {
        //all data
        console.log("in to else");
        data = await foodModel
            .find({})
            .populate({ path: "noteOfUser", match: { byUser: req.authUser._id } })

        .select("id name type image description noOfViews")

        .sort({ noOfViews: -1 });
    }
    if (data) {
        res.status(StatusCodes.OK).json({ total: data.length, data });
    } else {
        res.status(StatusCodes.OK).json({ status: 0, message: "No data" });
    }
});

const addFoodProducts = asyncWrapper(async(req, res, next) => {
    await foodModel.insertMany(req.body);

    res.status(StatusCodes.CREATED).json({ status: 1, message: "inserted !!" });
});

// const updateTimeFoodProducts = asyncWrapper(async (req, res, next) => {
//   const update = await foodModel.updateMany(
//     { name: { $regex: /na$/i } },
//     { inc: "-" }
//   );

//   res.status(StatusCodes.CREATED).json({ status: 1, message: update });
// });

const updateTimeFoodProducts = asyncWrapper(async(req, res, next) => {
    console.log("id...." + req.body.id);

    const update = await foodModel.updateMany({ _id: req.body.id }, {
        $inc: {
            noOfViews: 1,
        },
    });

    res.status(StatusCodes.CREATED).json({ status: 1, message: update });
});
//update fav status

//get all categories/types

const fetchFoodTypes = asyncWrapper(async(req, res, next) => {
    // var skip = Date.now() / 9;

    console.log("in to else");
    data = await foodModel
        .aggregate([
            { $match: {} },
            {
                $group: {
                    _id: "$type",
                    image: { $first: "$image" },
                    total: { $sum: 1 },
                },
            },
            {
                $project: {
                    name: "$_id",
                    total: "$total",
                    _id: false,
                    image: true,
                },
            },
        ])
        .sort({ noOfViews: -1 });

    res.status(StatusCodes.OK).json({
        total: data.length,
        data,
    });
});

module.exports = {
    fetchFoodProducts,
    addFoodProducts,
    updateTimeFoodProducts,
    fetchFoodTypes,
};