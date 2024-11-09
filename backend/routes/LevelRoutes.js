const router = require("express").Router(); 
const User = require("../models/User");
const getLevel = require("../controllers/getLevel");
const ensureAuthenticated = require("../middlewares/Auth");
const {getLessonDetails } = require("../controllers/getAllLevels");

router.post("/getLevel",ensureAuthenticated, getLevel);
router.get("/getLevel",ensureAuthenticated, getLessonDetails );

module.exports = router;