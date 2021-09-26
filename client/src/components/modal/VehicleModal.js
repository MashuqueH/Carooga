import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import VehicleInfo from "./VehicleInfo";
import Button from "@mui/material/Button";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

import {
    newVehicle,
    updateVehicle,
    toggleStatus,
} from "../../store/actions/vehicles";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    minWidth: "340px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const initialState = {
    make: "",
    model: "",
    year: "",
    price: "",
    status: "Live",
};

function VehicleModal({
    isNew,
    vehicle,
    newVehicle,
    updateVehicle,
    toggleStatus,
}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setVehicleInfo(vehicle);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [vehicleInfo, setVehicleInfo] = useState(vehicle);

    const handleChange = (prop) => (event) => {
        setVehicleInfo({ ...vehicleInfo, [prop]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNew) {
            newVehicle(vehicleInfo);
            setVehicleInfo(initialState);
        } else {
            updateVehicle(vehicleInfo);
        }
    };

    const handleToggleSold = () => {
        toggleStatus(vehicle._id, { status: vehicle.status });
    };

    return (
        <div>
            {isNew ? (
                <Button variant='contained' onClick={handleOpen}>
                    Add New Vehicle
                </Button>
            ) : (
                <IconButton aria-label='edit' onClick={handleOpen}>
                    <EditIcon />
                </IconButton>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                onBackdropClick='false'
            >
                <Box sx={style}>
                    <ModalHeader
                        title={isNew ? "Add New Vehicle" : "Edit vehicle"}
                        handleClose={handleClose}
                    />
                    <Divider />
                    <form onSubmit={handleSubmit}>
                        <VehicleInfo
                            vehicle={vehicleInfo}
                            handleChange={handleChange}
                        />
                        <Divider />
                        <ModalFooter
                            isNew={isNew}
                            status={vehicle.status}
                            handleMarkAsSold={handleToggleSold}
                        />
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

VehicleModal.defaultProps = {
    vehicle: initialState,
    isNew: true,
};

VehicleModal.propTypes = {
    isNew: PropTypes.bool.isRequired,
    vehicle: PropTypes.object,
    newVehicle: PropTypes.func,
    updateVehicle: PropTypes.func,
    toggleStatus: PropTypes.func,
};

export default connect(null, { newVehicle, updateVehicle, toggleStatus })(
    VehicleModal
);
