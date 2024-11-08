// onboarding -- language, level , referral
// updateXp
//update heart
// update level

const router = require("express").Router(); 
const User = require("../models/User");
const ensureAuthenticated = require("../middlewares/Auth");

const { getUser, updateExperience, updateLevel, updateHeart, setOnboarding } = require("../controllers/UserController");

router.post("/updatexp",ensureAuthenticated, updateExperience);
router.post("/updateheart",ensureAuthenticated, updateHeart);
router.post("/updatelevel",ensureAuthenticated, updateLevel);
router.post("/setonboarding",ensureAuthenticated, setOnboarding);
router.get("/get",ensureAuthenticated, getUser);
module.exports = router;