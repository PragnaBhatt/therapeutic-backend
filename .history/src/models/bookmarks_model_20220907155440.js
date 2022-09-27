const mongoose = require("mongoose");
const userModel = require("../models/user_model");
const bookmarkSchema = mongoose.Schema({
    title: {
        type: String,
        required: [
            true, "title is required"
        ],
        minlength: [
            3, "title length minimum is 3"
        ],
        maxlength: [
            150, "title length maximum is 150"
        ],
        trim: true
    },

    description: {
        type: String,
        required: [
            true, " description is required"
        ],
        minlength: [
            100, "description length minimum is 100"
        ],
        maxlength: [
            1000, "description length maximum is 1000"
        ],
        trim: true
    },

byUser : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
