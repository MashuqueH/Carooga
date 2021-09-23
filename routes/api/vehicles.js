const express = require("express");
const router = express.Router();
const Vehicle = require("../../models/Vehicle");
const { body, validationResult } = require("express-validator");

// @route   GET api/vehicles
// @desc    Get a list of vehicles
// @access  Public
router.get("/", async (req, res) => {
    try {
        console.log("GET api/vehicles");
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/vehicles
// @desc    Create a new vehicle listing
// @access  Public
router.post("/", async (req, res) => {
    try {
        console.log("POST api/vehicles");
        console.log(req.body);

        let newVehicle = await Vehicle.create(req.body);
        res.json(newVehicle);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   PATCH api/vehicles/:id
// @desc    Update a vehicle listing by id
// @access  Public
router.patch("/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        // res.sendStatus(200);
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.json(updatedVehicle);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   DELETE api/vehicles/:id
// @desc    Delete a vehicle listing by id
// @access  Public
router.delete("/:id", async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
