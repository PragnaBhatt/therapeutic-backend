const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middlewares/asyncWrappers");
const bookmarksModel = require("../models/bookmarks_model");
const foodModel = require("../models/food_model");
const CustomAPIError = require("../errors/custom_api_error");
const BadRequestError = require("../errors/bad_request_error");
const NotFoundError = require("../errors/not-found_error");
const createBookmark = asyncWrapper(async (req, res, next) => {
  const authUser = req.authUser;
  console.log(authUser.name);
  const forProduct = req.body.forProduct;

  const isValidfood = await foodModel.find({ _id: forProduct });

  if (!isValidfood) {
    throw new CustomAPIError("no such food found!");
  }
  // check of already Bookmark avialbale or not with userid and prodID
  const alreadyBookmarkSubmitted = await bookmarksModel.findOne({
    forProduct: forProduct,
    byUser: req.authUser._id,
  });
  console.log("already..." + alreadyBookmarkSubmitted);
console.log("req.authUser._id..." + req.authUser._id);



  if (alreadyBookmarkSubmitted) {
    res
      .status(StatusCodes.OK)
      .json({ status: 1, message: "already sumitted....." });
  }
  // req.body.user = authUser._id;
  // // req.body.food = authUser._id;
  // const Bookmark = await bookmarksModel.create({
  //   ...req.body,
  //   byUser: authUser._id,
  // });

  // res
  //   .status(StatusCodes.CREATED)
  //   .json({ status: 1, message: "Bookmark added", Bookmark });
});
const getAllBookmarks = asyncWrapper(async (req, res, next) => {
  const allBookmark = await bookmarksModel.find({ byUser: req.authUser._id });
  // .populate({path: "food", select: "name company price category -_id"}) // working OK and removed _id

  // .populate({ path: "food", select: "name company price category _id" }).populate({path: "food"}).populate({path: "user", select: "name email _id"});

  res
    .status(StatusCodes.CREATED)
    .json({ status: 1, message: "Bookmark list", allBookmark });
});

const getSingleBookmark = asyncWrapper(async (req, res, next) => {
  const { id: BookmarkId } = req.params;

  if (!BookmarkId) {
    throw new BadRequestError("Bookmark id not provided");
  }
  const Bookmark = await bookmarksModel.findById({ _id: BookmarkId });

  if (!Bookmark) {
    throw new NotFoundError("no such Bookmark available");
  }
  res.status(StatusCodes.OK).json({ status: 1, message: "Bookmark", Bookmark });
});

const updateBookmark = asyncWrapper(async (req, res, next) => {
  const { id: BookmarkId } = req.params;
  // const { rating, title, Bookmark } = req.body;

  if (!BookmarkId) {
    throw new BadRequestError("Bookmark id not provided");
  }
  // const Bookmark = await bookmarksModel.findById({ _id: BookmarkId });
  // const Bookmark = await bookmarksModel.findByIdAndUpdate(
  const Bookmark = await bookmarksModel.findOneAndUpdate(
    {
      _id: BookmarkId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
      strict: false,
    }
  );

  if (!Bookmark) {
    throw new NotFoundError("no such Bookmark available");
  }

  // Bookmark.rating = rating;
  // Bookmark.title = title;
  // Bookmark.Bookmark = Bookmark;
  // Bookmark.save();
  res
    .status(StatusCodes.OK)
    .json({ status: 1, message: "Bookmark updated", Bookmark });
});

const deleteBookmark = asyncWrapper(async (req, res, next) => {
  const { id: BookmarkId } = req.params;

  if (!BookmarkId) {
    throw new BadRequestError("Bookmark id not provided");
  }
  const Bookmark = await bookmarksModel.findById({ _id: BookmarkId });
  if (!Bookmark) {
    throw new NotFoundError("no such Bookmark available");
  }

  await Bookmark.remove();
  // await bookmarksModel.remove();

  res.status(StatusCodes.OK).json({ status: 1, message: "Bookmark removed!" });
});

module.exports = {
  createBookmark,
  getAllBookmarks,
  getSingleBookmark,
  updateBookmark,
  deleteBookmark,
};
