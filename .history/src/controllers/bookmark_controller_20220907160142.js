const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middlewares/asyncWrappers");
const bookmarksModel = require("../models/bookmarks_model");
const postModel = require("../models/post_model");
const CustomAPIError = require("../errors/custom_api_error");
const BadRequestError = require("../errors/bad_request_error");
const NotFoundError = require("../errors/not-found_error");
const createComment = asyncWrapper(async (req, res, next) => {
  const authUser = req.authUser;
  console.log(authUser.name);
  const { post: postId } = req.body;
  const isValidpost = await postModel.find({ _id: postId });
  if (!isValidpost) {
    throw new CustomAPIError("no such post found!");
  }
  // check of already Bookmark avialbale or not with userid and prodID
  const alreadyBookmarkSubmitted = await bookmarksModel.findOne({
    post: postId,
    user: authUser._id,
  });
  if (alreadyBookmarkSubmitted) {
    res
      .status(StatusCodes.OK)
      .json({ status: 1, message: "already sumitted....." });
  }
  req.body.user = authUser._id;
  // req.body.post = authUser._id;
  const Bookmark = await bookmarksModel.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ status: 1, message: "Bookmark added", Bookmark });
});
const getAllBookmarks = asyncWrapper(async (req, res, next) => {
  const allBookmark = await bookmarksModel.find({});
  // .populate({path: "post", select: "name company price category -_id"}) // working OK and removed _id

  // .populate({ path: "post", select: "name company price category _id" }).populate({path: "post"}).populate({path: "user", select: "name email _id"});

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
    throw new BadRequestError("comment id not provided");
  }
  const comment = await bookmarksModel.findById({ _id: commentId });
  if (!comment) {
    throw new NotFoundError("no such comment available");
  }

  await comment.remove();
  // await bookmarksModel.remove();

  res.status(StatusCodes.OK).json({ status: 1, message: "comment removed!" });
});

module.exports = {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment,
};
