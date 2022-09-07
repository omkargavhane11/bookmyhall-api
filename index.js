const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const mongoose = require('mongoose');
const Room = require('./Models/room');
const User = require('./Models/user');
const userRouter = require("./Routes/userRouter");

dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())

// connecting with mongo
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("Mongo connected ✅");
    }
);


app.get("/", (req, res) => {
    res.send("Welcome, search for the hall you need ✅")
})


app.use("/user", userRouter);


// ✅ create room (seats, amenities,price)
app.post("/createRoom", async (req, res) => {
    try {
        const newRoom = await Room.create(req.body);
        res.status(200).send(newRoom);
    } catch (error) {
        res.status(500).send(error.message);
    }
})


app.get("/rooms", async (req, res) => {
    try {
        const roomsData = await Room.find({});
        res.status(200).send(roomsData);
    } catch (error) {
        res.status(500).send(error.message);
    }
})


// ✅ book a room with (customer name, date, start time, end time, room ID)
app.put("/book/:roomId", async (req, res) => {
    try {
        // update room
        const updateRoomAvailability = await Room.updateOne({ _id: req.params.roomId }, { $set: { isBooked: true, bookedBy: req.body.bookedBy, bookDate: req.body.bookedDate } });

        // update user booked room status
        const updateUser = await User.updateOne({ _id: req.body.bookedBy }, { $set: { hasBookedRoom: true, bookedRoom: req.params.roomId } })

        // const createBooking = await Booking.create(req.body);
        res.status(200).send("room and user updated successfully")
    } catch (error) {
        res.status(500).send(error.message);
    }
})


// ✅list all rooms with book data (room name, booked status, customer name, date, start time, end time) 
app.get("/bookedrooms", async (req, res) => {
    try {
        const bookedRooms = await Room.find({ isBooked: true }).populate("bookedBy", "name _id");
        res.status(200).send(bookedRooms);
    } catch (error) {
        res.status(500).send(error.message);
    }
})


// ✅list all customers with booked data with (customer name, room name, date, start time, end time)
app.get("/users/bookings", async (req, res) => {
    try {
        const customers = await User.find({ hasBookedRoom: true }).populate("bookedRoom");
        res.status(200).send(customers);
    } catch (error) {
        res.status(500).send({ res: "unsuccessfull", error: error.message });
    }
})


app.listen(process.env.PORT, () => console.log("Server started..."));   