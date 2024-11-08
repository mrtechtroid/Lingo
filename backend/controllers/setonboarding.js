const User = require("../models/User");

const setOnboarding = async (req, res) => {
    try {
      const { language, level, referral } = req.body;
      const userId = req.user._id;
      const updatedUser = await User.findByIdAndUpdate(userId, 
      { $set: { language, level, referral } },
      { new: true });
      res.status(200).json({ message: "Onboarding Updated", success: true, user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };

module.exports = setOnboarding;