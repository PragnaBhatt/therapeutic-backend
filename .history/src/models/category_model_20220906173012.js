const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
    parentCategory: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    name: {
        type: String,
        required: [
            true, "please provide category name"
        ],
        minlength: [
            3, "name for category is too short"
        ],
        maxlength: [
            100, "name for category is too long"
        ],
        unique: true,
        trim: true
    },
    photoURL: {
        type: String,
        required: true,
        required: [true, "please provide category image"]
    },

    description: {
        type: String,
        minlength: [
            10, "description for category is too short"
        ],
        maxlength: [
            1000, "description for category is too long"
        ],
        required: [
            true, "please provide category description"
        ],
        trim: true
    },
    isActive: {
        type: Boolean,
        required: [
            true, "please provide isActive"
        ],
        default: true
    }
}, {timestamps: true});

categorySchema.methods.toJSON = function () {
    const cat = this;
    const catObject = cat.toObject();
    delete catObject.createdAt;
    return catObject;
};

const Category = new mongoose.model("category", categorySchema);
module.exports = Category;

