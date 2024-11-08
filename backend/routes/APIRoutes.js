const ensureAuthenticated = require("../middlewares/Auth");
const router = require("express").Router();

router.get("/authenticated", ensureAuthenticated, (req, res) => {
    res.status(200).json({
        message: "You are authenticated",
        success: true,
        user: req.user
    })
})

module.exports = router;
