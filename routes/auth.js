const express = require('express');

// Controller file
const {register} = require('../controllers/auth');

// Router
const router = express.Router();

// Path and method
router.post('/register', register);

module.exports = router;