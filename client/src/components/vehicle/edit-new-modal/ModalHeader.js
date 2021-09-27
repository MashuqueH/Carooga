import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ModalHeader({ title, handleClose }) {
    return (
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            sx={{ my: 1 }}
        >
            <Typography />
            <Typography variant='h5' align='center'>
                {title}
            </Typography>
            <IconButton aria-label='cancel' onClick={handleClose}>
                <CancelIcon />
            </IconButton>
        </Box>
    );
}
