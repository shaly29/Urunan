const router = require("express").Router();
const  User = require("../models/user");

router.get("/users/:email", async (req, res) => {
    try {
     
        const response = await User.findOne({ email: req.params.email });
        if (response) {
            res.json({
                success: true,
                response
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

module.exports = router;
