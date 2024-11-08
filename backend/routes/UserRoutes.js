// onboarding -- language, level , referral
// updateXp
//update heart
// update level

const router = require("express").Router(); 
const User = require("../models/User");
const updateXp = require("../controllers/updatexp");
const updateHeart = require("../controllers/updateheart");
const updateLevel = require("../controllers/updatelevel");
const setOnboarding = require("../controllers/setonboarding");
const ensureAuthenticated = require("../middlewares/Auth");

router.post("/updatexp",ensureAuthenticated, updateXp);
router.post("/updateheart",ensureAuthenticated, updateHeart);
router.post("/updatelevel",ensureAuthenticated, updateLevel);
router.post("/setonboarding",ensureAuthenticated, setOnboarding);

module.exports = router;