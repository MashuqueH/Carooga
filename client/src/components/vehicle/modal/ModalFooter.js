import React from "react";
import { Box, Button } from "@mui/material";

function ModalFooter({ status, handleMarkAsSold, isNew }) {
    return (
        <Box display='flex' flexDirection='row-reverse' sx={{ my: 1 }}>
            <Button
                variant='contained'
                sx={{ m: 1 }}
                color='success'
                type='submit'
            >
                {isNew ? "Save" : "Update"}
            </Button>
            {!isNew && (
                <Button
                    variant='contained'
                    sx={{ m: 1 }}
                    onClick={handleMarkAsSold}
                >
                    {status === "Live" ? "Mark As Sold" : "Mark as Live"}
                </Button>
            )}
        </Box>
    );
}

export default ModalFooter;
