import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";

import { removeAlert } from "../../../store/actions/alerts";

const AlertItem = ({ alert, removeAlert }) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        removeAlert(alert.id);
    };

    return (
        <Box sx={{ width: 1, m: 1 }}>
            <Collapse in={open}>
                <Alert
                    severity={alert.color}
                    action={
                        <IconButton
                            aria-label='close'
                            color='inherit'
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {alert.msg}
                </Alert>
            </Collapse>
        </Box>
    );
};

export default connect(null, { removeAlert })(AlertItem);
