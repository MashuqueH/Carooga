import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AlertItem from "./AlertItem";

const AlertLayout = ({ alerts, type }) => {
    const types = type.trim().split(" ");

    return (
        alerts?.length > 0 &&
        alerts.map(
            (alert) =>
                types.includes(alert.type) && (
                    <AlertItem alert={alert}></AlertItem>
                )
        )
    );
};

AlertLayout.propTypes = {
    alerts: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
};

export default connect((state) => ({
    alerts: state.alerts,
}))(AlertLayout);
