import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Functions
import { getAllVehicles } from "./store/actions/vehicles";

// Components

const App = ({ loading, vehicles, getAllVehicles }) => {
    useEffect(() => {
        getAllVehicles();
    }, [getAllVehicles]);

    return <></>;
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
