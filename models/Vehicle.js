const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    make: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        value: ['Live', 'Sold'],
        default: 'Live',
    },
});

module.exports = Vehicle = mongoose.model("vehicle", VehicleSchema);
