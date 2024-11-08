const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
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