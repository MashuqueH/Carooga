import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableHeader from "./TableHeader";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import VehicleModal from "../edit-new-modal/VehicleModal";
import DeleteVehicle from "./DeleteVehicle";
import AlertLayout from "../../layout/alert/AlertLayout";
import VehiclesChart from "../VehiclesChart";

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

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function VehiclesTable({ vehicles }) {
    const [search, setSearch] = useState("");
    const [vehiclesToShow, setVehiclesToShow] = useState(vehicles);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("no");

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const emptyRows =
        page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - vehiclesToShow.length)
            : 0;

    useEffect(() => {
        setVehiclesToShow(filterVehicles(search, vehicles));
    }, [vehicles, search]);

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
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
                                <VehiclesChart vehicles={vehicles} />
                            </TableRow>
                            <TableHeader
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                        </TableHead>
                        <TableBody>
                            {stableSort(
                                vehiclesToShow,
                                getComparator(order, orderBy)
                            )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((vehicle) => (
                                    <TableRow key={vehicle._id} hover>
                                        <TableCell>{vehicle.no}</TableCell>
                                        <TableCell component='th' scope='row'>
                                            {vehicle.make}
                                        </TableCell>
                                        <TableCell>{vehicle.model}</TableCell>
                                        <TableCell>{vehicle.year}</TableCell>
                                        <TableCell>
                                            ${vehicle.price.toLocaleString()}
                                        </TableCell>
                                        <TableCell>{vehicle.status}</TableCell>
                                        <TableCell>
                                            <Box display='flex'>
                                                <VehicleModal
                                                    vehicle={vehicle}
                                                    isNew={false}
                                                />
                                                <DeleteVehicle
                                                    id={vehicle._id}
                                                />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 73 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component='div'
                        count={vehiclesToShow.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Paper>
        </Box>
    );
}

VehiclesTable.defaultProps = {
    vehicles: [],
};

VehiclesTable.propTypes = {
    vehicles: PropTypes.array.isRequired,
};

export default VehiclesTable;
