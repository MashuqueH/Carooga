import axios from "axios";

export const GET_ALL_VEHICLES = "GET_ALL_VEHICLES";

export const getAllVehicles = () => async (dispatch) => {
    const { data } = await axios.get("/api/vehicles");
    console.log(data);
    dispatch({
        type: GET_ALL_VEHICLES,
        payload: data,
    });
};
