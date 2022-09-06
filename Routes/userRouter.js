const express = require('express');
const router = express.Router();
const User = require("../Models/user");


// add new user
router.post("/register", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).send({ msg: "User created successfully" })
        // console.log(req.body)
    } catch (error) {
        res.status(500).send({ msg: "Error creating user" });
    }
})

// get all users
router.get("/", async (req, res) => {
    try {
        const getAll = await User.find({}, { password: 0 });
        res.status(200).send(getAll)
    } catch (error) {
        res.status(500).send({ msg: error });
    }
})

// get user by ID
router.get("/:id", async (req, res) => {
    try {
        const getUser = await User.find({ _id: req.params.id }, { password: 0 });
        res.status(200).send(getUser)
    } catch (error) {
        res.status(500).send({ msg: error });
    }
})


module.exports = router;