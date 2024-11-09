const router = require("express").Router(); 
const User = require("../models/User");
const getLevel = require("../controllers/getLevel");
const ensureAuthenticated = require("../middlewares/Auth");
const getAllLevels = require("../controllers/getAllLevels");

router.post("/getLevel",ensureAuthenticated, getLevel);
router.get("/getLevel",ensureAuthenticated, getAllLevels);

module.exports = router;