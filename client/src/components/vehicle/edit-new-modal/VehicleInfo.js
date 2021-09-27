import React from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const validYear = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
).getFullYear();

function VehicleInfo({ vehicle, handleChange }) {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", my: 1 }}>
            <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                    required
                    id='vehicle-make'
                    value={vehicle.make}
                    onChange={handleChange("make")}
                    inputProps={{
                        inputMode: "text",
                        "aria-label": "year",
                    }}
                    label='Make'
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                    id='vehicle-model'
                    value={vehicle.model}
                    onChange={handleChange("model")}
                    inputProps={{
                        inputMode: "text",
                        "aria-label": "model",
                    }}
                    label='Model'
                    required
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                    id='vehicle-year'
                    label='Year'
                    value={vehicle.year}
                    onChange={handleChange("year")}
                    InputProps={{
                        inputProps: {
                            type: "number",
                            pattern: "[0-9]{4}",
                            min: 1990,
                            max: validYear,
                            "aria-label": "year",
                        },
                    }}
                    required
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                    required
                    label='Price'
                    id='vehicle-price'
                    value={vehicle.price}
                    onChange={handleChange("price")}
                    startAdornment={
                        <InputAdornment position='start'>$</InputAdornment>
                    }
                    InputProps={{
                        inputProps: {
                            type: "number",
                            step: "any",
                            pattern: "[0-9](.[0-9][0-9]?)?",
                            min: 1,
                            max: 10 ** 7,
                        },
                    }}
                />
            </FormControl>
        </Box>
    );
}

VehicleInfo.defaultProps = {
    vehicle: {
        make: "",
        model: "",
        year: "",
        price: "",
    },
};

export default VehicleInfo;
