const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');

// Read env file
dotenv.config({path:'./config/config.env'});

// Connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Route files
const auth = require('./routes/auth');

// Router
app.use('/auth', auth);

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