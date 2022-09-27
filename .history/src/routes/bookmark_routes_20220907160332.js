const express = require("express");
const {
    createComment,
    getAllComments,
    getSingleComment,
    updateComment,
    deleteComment
} = require("../controllers/comment_controller");
const {auth} = require("../middlewares/authentication_middleware.js");
const CommentRoute = express.Router();

CommentRoute.route("/createComment").post(auth, createComment);
CommentRoute.route("/getAllComments").get(getAllComments);
CommentRoute.route("/getSingleComment/:id").get(auth, getSingleComment);
CommentRoute.route("/updateComment/:id").patch(auth, updateComment);
CommentRoute.route("/deleteComment/:id").delete(auth, deleteComment);

module.exports = CommentRoute;
