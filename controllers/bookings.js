const Booking = require('../models/Booking');

// @desc    View all bookings
// @route   GET /api/bookings
// @access  Private only admin
exports.getBookings = async (req, res, next) => {
    let query;

    if(req.user.role !== 'admin'){
        query = Booking.find({user:req.user.id});
    }else{
        query = Booking.find();
    }

    try {
        const bookings = await query;

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    }catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Cannot find bookings"
        });
    }
};

// @desc    View a booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res, next) => {
    try {
        // Find booking by id
        const booking = await Booking.findById(req.params.id);

        // Don't find booking
        if (!booking) {
            return res.status(404).json({ success: false, message: `Booking not found` });
        }
        
        // Authorization check
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this booking'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    }catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Cannot find booking'
        });
    }
};

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private only user
exports.createBooking = async (req, res, next) => {
    try {
        // Check existedBookings < 1
        const existedBooking = await Booking.findOne({ user: req.user.id });

        if (existedBooking){
            return res.status(400).json({success: false, message: `The user with ID ${req.user.id} has already made booking`});
        }

        // Get body request
        const { bookingDate, dentist } = req.body;

        // Create a booking in database
        const booking = await Booking.create({
            bookingDate,
            user: req.user.id,
            dentist
        });

        res.status(201).json({
            success: true,
            data: booking
        });
    }catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Cannot create booking'
        });
    }
};

// @desc    Edit a booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res, next) => {
    try {
        let booking = await Booking.findById(req.params.id);
        
        // Don't find booking
        if(!booking) {
            return res.status(404).json({success: false, message: `No booking with the id of ${req.params.id}`});
        }

        // Authorization check
        if(booking.user.toString() !== req.user.id && req.user.role !== 'admin'){
            return res.status(403).json({success: false, message: `User ${req.user.id} is not authorized to update this booking`});
        }

        // Find booking by id and update
        booking = await Booking.findByIdAndUpdate(req.params.id,req.body,{new: true,runValidators: true});

        res.status(200).json({
            success: true,
            data: booking
        });

    }catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Cannot update booking'
        });
    }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = async (req, res, next) => {
    try {
        // Find booking by id and delete
        const booking = await Booking.findById(req.params.id);

        // Don't find booking
        if (!booking) {
            return res.status(404).json({ success: false, message: `Booking not found` });
        }

        // Authorization check
        if(booking.user.toString() !== req.user.id && req.user.role !== 'admin'){
            return res.status(403).json({success: false, message: `User ${req.user.id} is not authorized to delete this booking`});
        }

        await booking.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Cannot delete booking'
        });
    }
};