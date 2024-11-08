const User = require("../models/User");
const joi = require("joi");

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateExperience = async (req, res) => {
    const schema = joi.object({
        _id: joi.string().required(),
        experience: joi.number().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
    try {
      const experience = req.body.experience;
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

  const updateLevel = async (req, res) => {
    const schema = joi.object({
        _id: joi.string().required(),
        level: joi.number().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
    try {
      const level=req.body.level;
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
  const updateHeart = async (req, res) => {
    const schema = joi.object({
        _id: joi.string().required(),
        hearts: joi.number().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
    try {
      userId = req.user._id;
      const hearts = req.body.hearts;
      const updatedUser = await User.findByIdAndUpdate(userId, 
      { $set: { hearts } },
      { new: true });
      res.status(200).json({ message: "Hearts Updated", success: true, user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };    

  const setOnboarding = async (req, res) => {
    const schema = joi.object({
        _id: joi.string().required(),
        language: joi.string().required(),
        level: joi.number().required(),
        referral: joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
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

  module.exports = {
    getUser,
    updateExperience,
    updateLevel,
    updateHeart,
    setOnboarding,
  };
