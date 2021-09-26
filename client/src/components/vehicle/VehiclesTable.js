import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";

import VehicleModal from "./modal/VehicleModal";

const filterObject = (query, obj) => {
    if (!query || query.length < 2) {
        return obj;
    }

    let filteredObj = obj.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(query.toLowerCase())
        )
    );

    return filteredObj;
};

function VehiclesTable({ vehicles }) {
    const [search, setSearch] = useState("");
    const [vehiclesToShow, setVehiclesToShow] = useState(vehicles);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        setVehiclesToShow(filterObject(search, vehicles));
    }, [vehicles, search]);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3}>
                            <VehicleModal />
                        </TableCell>
                        <TableCell align='right' colSpan={4}>
                            <TextField
                                type='search'
                                id='standard-basic'
                                label='Search'
                                variant='standard'
                                value={search}
                                onChange={handleSearchChange}
                                sx={{ width: 240 }}
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
                            <TableCell>{vehicle._id}</TableCell>
                            <TableCell component='th' scope='row'>
                                {vehicle.make}
                            </TableCell>
                            <TableCell>{vehicle.model}</TableCell>
                            <TableCell>{vehicle.year}</TableCell>
                            <TableCell>${vehicle.price}</TableCell>
                            <TableCell>{vehicle.status}</TableCell>
                            <TableCell>
                                <VehicleModal vehicle={vehicle} isNew={false} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

VehiclesTable.defaultProps = {
    vehicles: [],
};

VehiclesTable.propTypes = {
    vehicles: PropTypes.array.isRequired,
};

export default VehiclesTable;
