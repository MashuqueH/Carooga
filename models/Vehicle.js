const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
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
        value: ["Live", "Sold"],
        default: "Live",
    },
});

VehicleSchema.plugin(AutoIncrement, { inc_field: "no" });

module.exports = Vehicle = mongoose.model("vehicle", VehicleSchema);
