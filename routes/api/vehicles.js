const express = require("express");
const router = express.Router();
const Vehicle = require("../../models/Vehicle");
const { validateVehicle } = require("../../util/vehicleValidator");

// @route   GET api/vehicles
// @desc    Get a list of vehicles
// @access  Public
router.get("/", async (req, res) => {
    try {
        console.log("GET api/vehicles");
        const vehicles = await Vehicle.find().sort({
            no: 1,
        });

        if (!vehicles) {
            return res.status(400).json({
                message:
                    "There was an error retrieving the vehicles inventory. Please try again.",
            });
        }

        res.json(vehicles);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: "Server error" });
    }
});

// @route   POST api/vehicles
// @desc    Create a new vehicle listing
// @access  Public
router.post("/", async (req, res) => {
    try {
        console.log("POST api/vehicles");

        validateVehicle(req.body);

        let newVehicle = await Vehicle.create(req.body);

        if (!newVehicle) {
            res.status(400).json({
                message:
                    "There was an error creating the vehicle listing. Please try again.",
            });
        }

        res.json(newVehicle);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
    }
});

// @route   PUT api/vehicles
// @desc    Update a vehicle listing
// @access  Public
router.put("/", async (req, res) => {
    try {
        console.log("PUT api/vehicles");

        validateVehicle(req.body);

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.body._id,
            req.body,
            {
                new: true,
            }
        );

        if (!updatedVehicle) {
            throw new Error(
                "There was en error while updating the vehicle information. Please try again"
            );
        }

        res.json(updatedVehicle);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
    }
});

// @route   PATCH api/vehicles/:id
// @desc    Mark a vehicle as sold or live
// @access  Public
router.patch("/:id", async (req, res) => {
    try {
        console.log("PATCH api/vehicles/:id");

        if (
            !req.body.status ||
            (req.body.status !== "Sold" && req.body.status !== "Live")
        ) {
            res.sendStatus(400).json({
                message: "Vehicle status must be either 'Live' or 'Sold'",
            });
        }

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status === "Sold" ? "Live" : "Sold",
            },
            {
                new: true,
            }
        );

        if (!updatedVehicle) {
            throw new Error(
                "There was en error while updating the vehicle information. Please try again"
            );
        }

        res.json(updatedVehicle);
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: err.message });
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
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
