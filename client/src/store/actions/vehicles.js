import axios from "axios";

export const GET_ALL_VEHICLES = "GET_ALL_VEHICLES";
export const GET_ALL_VEHICLES_ERROR = "GET_ALL_VEHICLES_ERROR";

export const getAllVehicles = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/vehicles");
        dispatch({
            type: GET_ALL_VEHICLES,
            payload: data,
        });
    } catch (error) {
        dispatch({ type: GET_ALL_VEHICLES_ERROR });
        console.error(error);
    }
};
