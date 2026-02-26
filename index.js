const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');

// Security require
const mongoSanitize = require('@exortek/express-mongo-sanitize');
const helmet = require('helmet');
const {xss} = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

// Read env file
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Config rate limiting
// Max request for windowsMs ms
const limiter = rateLimit({
    windowsMs: 10*60*1000,
    max: 100
});

const app = express();
app.use(express.json());
app.use(cookieParser());

// Security used
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(limiter);
app.use(hpp());
app.use(cors());

// Route files
const auth = require('./routes/auth');
const bookings = require('./routes/bookings');
const dentist = require('./routes/dentist');

// Router
app.use('/api/auth', auth);
app.use('/api/bookings', bookings);
app.use('/api/dentist', dentist);

// Server port and listen
const PORT = process.env.PORT || 5003;
const server = app.listen(
    PORT,
    console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});