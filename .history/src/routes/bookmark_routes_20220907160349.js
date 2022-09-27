const express = require("express");
const {
  createBookmark,
  getAllBookmarks,
  getSingleBookmark,
  updateBookmark,
  deleteBookmark,
} = require("../controllers/Bookmark_controller");
const { auth } = require("../middlewares/authentication_middleware.js");
const BookmarkRoute = express.Router();

BookmarkRoute.route("/createBookmark").post(auth, createBookmark);
BookmarkRoute.route("/getAllBookmarks").get(getAllBookmarks);
BookmarkRoute.route("/getSingleBookmark/:id").get(auth, getSingleBookmark);
BookmarkRoute.route("/updateBookmark/:id").patch(auth, updateBookmark);
BookmarkRoute.route("/deleteBookmark/:id").delete(auth, deleteBookmark);

module.exports = BookmarkRoute;
