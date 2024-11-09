const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
    synopsis:{
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
    },
    difficulty:{
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Lesson", LessonSchema);