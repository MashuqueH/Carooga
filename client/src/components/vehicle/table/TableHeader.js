import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

const columns = [
    {
        id: "no",
        label: "No",
    },
    {
        id: "make",
        label: "Make",
    },
    {
        id: "model",
        label: "Model",
    },
    {
        id: "year",
        label: "Year",
    },
    {
        id: "price",
        label: "Price",
    },
    {
        id: "status",

        label: "Status",
    },
    {
        id: "actions",
        label: " ",
    },
];

function TableHeader({ order, orderBy, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableRow>
            {columns.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box component='span' sx={visuallyHidden}>
                                {order === "desc"
                                    ? "sorted descending"
                                    : "sorted ascending"}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            ))}
        </TableRow>
    );
}

TableHeader.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default TableHeader;
