const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    // Get token from request headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) token = req.headers.authorization.split(' ')[1];

    // Token not exists
    if (!token) return res.status(401).json({
        success: false,
        message: "Not authorize to access this route"
    });

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from id
        req.user = await User.findById(decoded.id);

        // Go to target route
        next();
    }catch (err) {
        res.status(401).json({
            success: false,
            message: "Not authorize to access this route"
        });
        console.error(err.message);
    }
};