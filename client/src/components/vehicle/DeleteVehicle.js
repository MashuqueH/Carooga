import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteVehicle } from "../../store/actions/vehicles";
import Loading from "../layout/Loading";

function DeleteVehicle({ loading, id, deleteVehicle }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteVehicle = () => {
        deleteVehicle(id);
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='delete-dialog-title'
                aria-describedby='delete-dialog-description'
            >
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <DialogTitle id='delete-dialog-title'>
                            Delete vehicle
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id='alert-dialog-description'>
                                Are you sure you want to delete this vehicle?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleDeleteVehicle} color='error'>
                                Delete
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div>
    );
}

DeleteVehicle.propTypes = {
    loading: PropTypes.bool,
    id: PropTypes.string,
    deleteVehicle: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({
        loading: state.vehicles.loading,
    }),
    {
        deleteVehicle,
    }
)(DeleteVehicle);
