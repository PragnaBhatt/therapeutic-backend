const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middlewares/asyncWrappers");
const commentModel = require("../models/boo");
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
  // check of already comment avialbale or not with userid and prodID
  const alreadycommentSubmitted = await commentModel.findOne({
    post: postId,
    user: authUser._id,
  });
  if (alreadycommentSubmitted) {
    res
      .status(StatusCodes.OK)
      .json({ status: 1, message: "already sumitted....." });
  }
  req.body.user = authUser._id;
  // req.body.post = authUser._id;
  const comment = await commentModel.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ status: 1, message: "comment added", comment });
});
const getAllComments = asyncWrapper(async (req, res, next) => {
  const allcomment = await commentModel.find({});
  // .populate({path: "post", select: "name company price category -_id"}) // working OK and removed _id

  // .populate({ path: "post", select: "name company price category _id" }).populate({path: "post"}).populate({path: "user", select: "name email _id"});

  res
    .status(StatusCodes.CREATED)
    .json({ status: 1, message: "comment list", allcomment });
});

const getSingleComment = asyncWrapper(async (req, res, next) => {
  const { id: commentId } = req.params;

  if (!commentId) {
    throw new BadRequestError("comment id not provided");
  }
  const comment = await commentModel.findById({ _id: commentId });

  if (!comment) {
    throw new NotFoundError("no such comment available");
  }
  res.status(StatusCodes.OK).json({ status: 1, message: "comment", comment });
});

const updateComment = asyncWrapper(async (req, res, next) => {
  const { id: commentId } = req.params;
  // const { rating, title, comment } = req.body;

  if (!commentId) {
    throw new BadRequestError("comment id not provided");
  }
  // const comment = await commentModel.findById({ _id: commentId });
  // const comment = await commentModel.findByIdAndUpdate(
  const comment = await commentModel.findOneAndUpdate(
    {
      _id: commentId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
      strict: false,
    }
  );

  if (!comment) {
    throw new NotFoundError("no such comment available");
  }

  // comment.rating = rating;
  // comment.title = title;
  // comment.comment = comment;
  // comment.save();
  res
    .status(StatusCodes.OK)
    .json({ status: 1, message: "comment updated", comment });
});

const deleteComment = asyncWrapper(async (req, res, next) => {
  const { id: commentId } = req.params;

  if (!commentId) {
    throw new BadRequestError("comment id not provided");
  }
  const comment = await commentModel.findById({ _id: commentId });
  if (!comment) {
    throw new NotFoundError("no such comment available");
  }

  await comment.remove();
  // await commentModel.remove();

  res.status(StatusCodes.OK).json({ status: 1, message: "comment removed!" });
});

module.exports = {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment,
};
