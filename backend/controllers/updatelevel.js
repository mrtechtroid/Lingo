const User = require("../models/User");

const updateLevel = async (req, res) => {
    try {
      const level=req.body;
      const userId = req.user._id;
      // const { userId, level } = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, 
      { $set: { level } },
      { new: true });
      res.status(200).json({ message: "Level Updated", success: true, user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };

module.exports = updateLevel;