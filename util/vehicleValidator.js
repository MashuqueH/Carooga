const validYear = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
).getFullYear();

const validateVehicle = (vehicle) => {
    if (!vehicle) {
        throw new Error("Invalid vehicle information");
    }

    if (!vehicle.make) {
        throw new Error("Please enter a valid vehicle make");
    }

    if (!vehicle.model) {
        throw new Error("Please enter a valid vehicle model");
    }

    if (!vehicle.price || +vehicle.price < 1 || +vehicle.price > 10 ** 7) {
        throw new Error("Please enter a valid price");
    }

    if (!vehicle.year || +vehicle.year < 1900 || +vehicle.year > validYear) {
        throw new Error(
            `Please enter a valid year between 1900 and ${validYear}`
        );
    }

    if (
        !vehicle.status ||
        (vehicle.status !== "Live" && vehicle.status !== "Sold")
    ) {
        throw new Error("Vehicle status must be either 'Live' or 'Sold'");
    }
};

module.exports = {
    validYear,
    validateVehicle,
};
