import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";

function VehiclesTable({ vehicles }) {
    const [search, setSearch] = useState("");
    const [vehiclesToShow, setVehiclesToShow] = useState(vehicles);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);

        if (!e.target.value) {
            setVehiclesToShow(vehicles);
        } else {
            setVehiclesToShow(
                vehicles.filter((vehicle) =>
                    Object.values(vehicle).some((value) =>
                        String(value)
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                    )
                )
            );
        }
    };

    return (
        <TableContainer>
            <Table sx={{ minWidth: 360 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3}>
                            <Button variant='contained'>Add New Vehicle</Button>
                        </TableCell>
                        <TableCell colSpan={4}>
                            <TextField
                                id='standard-basic'
                                label='Search'
                                variant='standard'
                                value={search}
                                onChange={handleSearchChange}
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
                            <TableCell>{vehicle._id}</TableCell>
                            <TableCell component='th' scope='row'>
                                {vehicle.make}
                            </TableCell>
                            <TableCell>{vehicle.model}</TableCell>
                            <TableCell>{vehicle.year}</TableCell>
                            <TableCell>${vehicle.price}</TableCell>
                            <TableCell>{vehicle.status}</TableCell>
                            <TableCell>
                                <IconButton
                                    aria-label='edit'
                                    onClick={() => {
                                        console.log(vehicle);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
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

export default VehiclesTable;
