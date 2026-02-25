const User = require('../models/User');

// @desc    Register
// @route   POST /auth/register
// @access  Public
exports.register = async (req, res, next) => {
    // Get body request
    try {
        const {name, telephone, email, password, role} = req.body;
        // Register
        const user = await User.create({
            name,
            telephone,
            email,
            password,
            role
        });

        res.status(200).json({
            success: true,
            data: user
        });
    }catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.error(err.message);
    }
};