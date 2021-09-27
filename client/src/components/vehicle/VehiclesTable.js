import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import VehicleModal from "./edit-new-modal/VehicleModal";
import DeleteVehicle from "./DeleteVehicle";
import AlertLayout from "../layout/alert/AlertLayout";

const filterVehicles = (query, vehicles) => {
    if (!query || query.length < 2) {
        return vehicles;
    }

    return vehicles.filter((item) =>
        Object.values(item).some((value) =>
            String(value)
                .toLowerCase()
                .trim()
                .includes(query.toLowerCase().trim())
        )
    );
};

function VehiclesTable({ vehicles }) {
    const [search, setSearch] = useState("");
    const [vehiclesToShow, setVehiclesToShow] = useState(vehicles);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        setVehiclesToShow(filterVehicles(search, vehicles));
    }, [vehicles, search]);

    return (
        <>
            <AlertLayout type='vehicles_table' />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <VehicleModal />
                            </TableCell>
                            <TableCell align='center' colSpan={3}>
                                <TextField
                                    type='search'
                                    id='standard-basic'
                                    label='Search'
                                    variant='standard'
                                    value={search}
                                    onChange={handleSearchChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Make</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehiclesToShow.map((vehicle) => (
                            <TableRow key={vehicle._id}>
                                <TableCell>{vehicle.no}</TableCell>
                                <TableCell component='th' scope='row'>
                                    {vehicle.make}
                                </TableCell>
                                <TableCell>{vehicle.model}</TableCell>
                                <TableCell>{vehicle.year}</TableCell>
                                <TableCell>${vehicle.price}</TableCell>
                                <TableCell>{vehicle.status}</TableCell>
                                <TableCell>
                                    <Box display='flex'>
                                        <VehicleModal
                                            vehicle={vehicle}
                                            isNew={false}
                                        />
                                        <DeleteVehicle id={vehicle._id} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

VehiclesTable.defaultProps = {
    vehicles: [],
};

VehiclesTable.propTypes = {
    vehicles: PropTypes.array.isRequired,
};

export default VehiclesTable;
