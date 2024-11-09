const Lesson = require("../models/Lessons");

const getLessonDetails = async (req, res) => {
  try {
    const lessons = await Lesson.find({}, "synopsis levels difficulty").sort({ difficulty: 1 }).lean();
    
    // Format each lesson as JSON with only scenario and levels fields
    const response = lessons.map((lesson) => ({
      _id: lesson._id,
      synopsis: lesson.synopsis,
      levels: lesson.levels,
      difficulty: lesson.difficulty,
    }));

    res.status(200).json(response);
  } catch (err) {
    console.error("Error retrieving lesson details:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getLessonDetails };
