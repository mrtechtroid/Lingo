const Lesson = require("../models/Lesson");

const getLessonDetails = async (req, res) => {
  try {
    const lessons = await Lesson.find({}, "scenario levels").lean();
    
    // Format each lesson as JSON with only scenario and levels fields
    const response = lessons.map((lesson) => ({
      scenario: lesson.scenario,
      levels: lesson.levels,
    }));

    res.status(200).json(response);
  } catch (err) {
    console.error("Error retrieving lesson details:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getLessonDetails };
