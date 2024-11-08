const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
    },
    scenario:{
        type: String,
        required: true,
    },
    keywords:{
        type: [[String]],
        required: true,
    },
    levels:{
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Lesson", LessonSchema);