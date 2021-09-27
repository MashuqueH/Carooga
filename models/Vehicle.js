const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;
const { validYear } = require("../util/vehicleValidator");
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
        min: [1900, "Please enter a valid year"],
        max: [validYear, "Please enter a valid year"],
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        min: [1, "Please enter a valid price"],
        max: [10 ** 7, "Please enter a valid price"],
    },
    created: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        trim: true,
        value: ["Live", "Sold"],
        default: "Live",
        required: () => this.status === "Live" || this.staus === "Sold",
    },
});

VehicleSchema.plugin(AutoIncrement, { inc_field: "no" });

module.exports = Vehicle = mongoose.model("vehicle", VehicleSchema);
