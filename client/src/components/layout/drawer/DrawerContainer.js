import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import DrawerItems from "./DrawerItems";

function DrawerContainer({ mobileOpen, handleDrawerToggle, drawerWidth }) {
    const container = window?.document.body;

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label='mailbox folders'
        >
            <Drawer
                container={container}
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                <DrawerItems />
            </Drawer>
            <Drawer
                variant='permanent'
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                <DrawerItems />
            </Drawer>
        </Box>
    );
}

export default DrawerContainer;
