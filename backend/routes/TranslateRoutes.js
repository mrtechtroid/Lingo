const router = require("express").Router(); 
const User = require("../models/User");
const Translate = require("../controllers/TranslateController");
const ensureAuthenticated = require("../middlewares/Auth");

router.post("/translate",ensureAuthenticated,Translate);

module.exports = router;