const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.set('strictQuery', true);
    const connect = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB Connected: ${connect.connection.host}`);
};

module.exports = connectDB;