const express = require("express");
// var bodyParser = require("body-parser");

//database connection
const connectDB = require("./src/config/db");
require("dotenv").config();
const app = express();
const morgan = require("morgan");

// middleware
const notFoundMiddleware = require("./src/middlewares/not-found_middleware");
const errorHandlerMiddleware = require("./src/middlewares/error-handler");
const { StatusCodes } = require("http-status-codes");
//routes
const foodRoutes = require("./src/routes/food_route");
const BookmarkRoute = require("./src/routes/bookmark_routes");
const BookmarkRoute = require("./src/routes/user");

app.use(morgan("tiny"));
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ status: StatusCodes.OK, message: "working..." });
});
app.use("/food", foodRoutes);
app.use("/food/bookmarks", BookmarkRoute);

app.use("/images", express.static("images"));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// const PORT = process.env.PORT || 5000;
const PORT = 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log("connected sucessfully..."));
  } catch (e) {
    console.log(e);
  }
};

start();
