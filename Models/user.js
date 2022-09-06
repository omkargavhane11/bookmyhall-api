const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
        max: 20
    },
    contactNo: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    hasBookedRoom: {
        type: Boolean,
        default: false
    },
    bookedRoom: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        default: null,
    }

},
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema)