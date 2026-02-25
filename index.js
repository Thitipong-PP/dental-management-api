const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Read env file
dotenv.config({path:'./config/config.env'});

// Connect to database
connectDB();

const app = express();
app.use(express.json());

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