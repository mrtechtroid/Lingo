const User = require("../models/User");
const Lesson = require("../models/Lessons");
const joi = require("joi");
let HEARTS = {}
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
        // _id: joi.string().required(),
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
        lesson:joi.string().required(),
        level: joi.number().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
    try {
      let level=req.body.level;
      let lesson=req.body.lesson;

      const lessonObj = await Lesson.findOne({_id:lesson});
      if (!lessonObj) return res.status(404).json({ message: "Lesson not found" });
      if (lessonObj.levels <= level) {lesson = lessonObj.next; level = -1};
      console.log(lessonObj,level,lesson);
      const userId = req.user._id;
      // const { userId, level } = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, 
      { $set: { level , lesson } },
      { new: true });
      res.status(200).json({ message: "Level Updated", success: true, user: updatedUser });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };
  const updateHeart = async (req, res) => {
    const schema = joi.object({
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
      HEARTS[userID]= setInterval(async ()=>{
        await User.findByIdAndUpdate(userId, 
            { $inc: { hearts:1 } },
            { new: true })
        if (res.hearts >=5){
            clearInterval(HEARTS[userID])
        }
      },15000)
      res.status(200).json({ message: "Hearts Updated", success: true, user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };    

  const setOnboarding = async (req, res) => {
    const schema = joi.object({
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

  const getLeaderboard = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      const sortedUsers = await User.find().sort({ experience: -1 });
      let users = []
      for (let i = 0; i < sortedUsers.length; i++) {
        users.push({name:sortedUsers[i].name, experience:sortedUsers[i].experience})
      }
      res.status(200).json({ message: "Leaderboard", success: true, users });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };
  const exchangeHearts = async (req, res) => {
    try {
      const { experience } = req.body;
      const userId = req.user._id;
      if (await User.findOne({ _id: userId }).experience < 20){
        return res.status(400).json({ message: "Not enough experience to exchange hearts", success: false });
      }
      const updatedUser = await User.findByIdAndUpdate(userId, 
        { 
          $inc: { experience: -20, hearts: 1 } 
        },
      { new: true });
      res.status(200).json({ message: "Hearts Exchanged", success: true, user: updatedUser });
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
    getLeaderboard,
    exchangeHearts,
  };
