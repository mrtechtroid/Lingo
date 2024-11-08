const User = require("../models/User");

const updateExperience = async (req, res) => {
    try {
      console.log(req.user);
      console.log(req.body);
      const experience = req.body;
      const userId = req.user._id;
      const updatedUser = await User.findByIdAndUpdate(userId, 
        { $inc: { experience: experience } },
        { new: true }
      );
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "Experience updated successfully", success: true, updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };

module.exports = updateExperience;

