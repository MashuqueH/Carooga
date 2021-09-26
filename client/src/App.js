import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import VehiclesTable from "./components/VehiclesTable";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import DrawerContainer from "./components/drawer/DrawerContainer";

import { getAllVehicles } from "./store/actions/vehicles";

const drawerWidth = 300;

const App = ({ loading, vehicles, getAllVehicles }) => {
    useEffect(() => {
        getAllVehicles();
    }, [getAllVehicles]);

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position='fixed'
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component='nav'
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label='mailbox folders'
            >
                <DrawerContainer
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    drawerWidth={drawerWidth}
                />
            </Box>
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {loading ? (
                    <CircularProgress />
                ) : (
                    <VehiclesTable vehicles={vehicles} />
                )}
            </Box>
        </Box>
    );
};

App.propTypes = {
    vehicles: PropTypes.array,
    loading: PropTypes.bool,
    getAllVehicles: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({
        loading: state.vehicles.loading,
        vehicles: state.vehicles.vehicles,
    }),
    { getAllVehicles }
)(App);
