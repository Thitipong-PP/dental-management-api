const mongoose = require('mongoose');

const DentistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a dentist name'],
        trim: true
    },
    yearsOfExperience: {
        type: Number,
        required: [true, 'Please add years of experience']
    },
    areaOfExpertise: {
        type: String,
        required: [true, 'Please add area of expertise']
    }
});

module.exports = mongoose.model('Dentist', DentistSchema);