const User = require('../models/User');

// @desc    Register
// @route   POST /auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        // Get body request
        const {name, telephone, email, password, role} = req.body;

        // Register
        const user = await User.create({
            name,
            telephone,
            email,
            password,
            role
        });

        // Create token for JWT
        const token = user.getSignedJwtToken();

        res.status(201).json({
            success: true,
            data: user,
            token
        });
    }catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
        console.error(err.message);
    }
};

// @desc    Login
// @route   POST /auth/login
// @access  Public
exports.login = async (req, res, next) => {
    // Get body request
    const {email, password} = req.body;

    // Validate email & password
    if (!email || !password) return res.status(400).json({
        success: false,
        message: "Please provide an email and password"
    });

    // Find user in database
    const user = await User.findOne({email}).select('+password');

    // Don't find user in database
    if (!user) return res.status(400).json({
        success: false,
        message: "Invalid credentials"
    });

    // Check matched password
    const isMatch = await user.matchPassword(password);

    // Password don't match
    if (!isMatch) return res.status(401).json({
        success: false,
        message: "Invalid password"
    });

    // Create token for JWT
    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        data: user,
        token
    });
};