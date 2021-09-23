const express = require("express");
const router = express.Router();

// @route   GET api/vehicles
// @desc    Get a list of vehicles
// @access  Public
router.get("/", async (req, res) => {
    try {
        // const user = await User.findById(req.user.id).select(
        //     "-password -salt -facebookId -googleId -resetPasswordExpires -resetPasswordToken"
        // );
        // res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
