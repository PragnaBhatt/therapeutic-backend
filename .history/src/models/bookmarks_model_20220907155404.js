const mongoose = require("mongoose");
byUser : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
