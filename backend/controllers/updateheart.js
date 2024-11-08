const User = require("../models/User");

const updateHeart = async (req, res) => {
    try {
      userId = req.user._id;
      const hearts = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, 
      { $set: { hearts } },
      { new: true });
      res.status(200).json({ message: "Hearts Updated", success: true, user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };    

  module.exports = updateHeart;