import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Chart from "react-google-charts";
import Loading from "../layout/Loading";

const formatData = (vehicles) => {
    let numSold = 0,
        numLive = 0;

    for (let vehicle of vehicles) {
        if (vehicle.status === "Live") {
            numLive++;
        } else if (vehicle.status === "Sold") {
            numSold++;
        }
    }

    return [
        ["Status", "Count"],
        ["Sold", numSold],
        ["Live", numLive],
    ];
};

function VehiclesChart({ vehicles }) {
    const [data, setData] = useState(formatData(vehicles));

    useEffect(() => {
        setData(formatData(vehicles));
    }, [setData, vehicles]);

    return (
        <Box display='flex' justifyContent='center'>
            <Chart
                width={300}
                height={300}
                chartType='Bar'
                loader={<Loading />}
                data={data}
                options={{
                    chart: {
                        title: "Inventory Status",
                        subtitle:
                            "Number of sold and live vehicles in inventory",
                    },
                    legend: { position: "none" },
                }}
            />
        </Box>
    );
}

VehiclesChart.defaultProps = {
    vehicles: [],
};

VehiclesChart.propTypes = {
    vehicles: PropTypes.array.isRequired,
};

export default VehiclesChart;
