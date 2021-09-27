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
import AlertLayout from "../../layout/alert/AlertLayout";
import Loading from "../../layout/Loading";
import {
    newVehicle,
    updateVehicle,
    toggleStatus,
} from "../../../store/actions/vehicles";

import { removeAlerts } from "../../../store/actions/alerts";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    minWidth: 340,
    minHeight: 400,
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
    loading,
    isNew,
    vehicle,
    newVehicle,
    updateVehicle,
    toggleStatus,
    removeAlerts,
}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setVehicleInfo(vehicle);
    };
    const handleClose = (e) => {
        setOpen(false);
        removeAlerts("vehicle_modal");
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
        <Box>
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
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <AlertLayout type='vehicle_modal' />
                            <ModalHeader
                                title={
                                    isNew ? "Add New Vehicle" : "Edit Vehicle"
                                }
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
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}

VehicleModal.defaultProps = {
    vehicle: initialState,
    isNew: true,
};

VehicleModal.propTypes = {
    loading: PropTypes.bool,
    isNew: PropTypes.bool,
    vehicle: PropTypes.object,
    newVehicle: PropTypes.func,
    updateVehicle: PropTypes.func,
    toggleStatus: PropTypes.func,
    removeAlerts: PropTypes.func,
};

export default connect(
    (state) => ({
        loading: state.vehicles.loading,
    }),
    {
        newVehicle,
        updateVehicle,
        toggleStatus,
        removeAlerts,
    }
)(VehicleModal);
