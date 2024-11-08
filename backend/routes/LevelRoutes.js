const router = require("express").Router(); 
const User = require("../models/User");
const getLevel = require("../controllers/getLevel");
const ensureAuthenticated = require("../middlewares/Auth");

router.get("/getLevel",ensureAuthenticated, getLevel);

module.exports = router;