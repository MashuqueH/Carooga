import axios from "axios";
import { setAlert } from "./alerts";

export const SET_LOADING = "SET_LOADING";
export const REMOVE_LOADING = "REMOVE_LOADING";
export const GET_ALL_VEHICLES = "GET_ALL_VEHICLES";
export const UPDATE_VEHICLE = "UPDATE_VEHICLE";
export const NEW_VEHICLE = "NEW_VEHICLE";
export const TOGGLE_STATUS = "TOGGLE_STATUS";
export const VEHICLES_ERROR = "VEHICLES_ERROR";

export const getAllVehicles = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/vehicles");
        dispatch({
            type: GET_ALL_VEHICLES,
            payload: data,
        });
    } catch (error) {
        dispatch({ type: VEHICLES_ERROR });
        console.error(error);
    }
};

export const newVehicle = (vehicle) => async (dispatch) => {
    try {
        dispatch({ type: SET_LOADING });
        const { data } = await axios.post(`/api/vehicles`, vehicle);
        dispatch({ type: NEW_VEHICLE, payload: data });
        dispatch(
            setAlert("Vehicle added successfully", "primary", "vehicle_modal")
        );
    } catch (error) {
        dispatch({ type: VEHICLES_ERROR });
        dispatch(
            setAlert("Vehicle added successfully", "primary", "vehicle_modal")
        );
        console.error(error);
    }
};

export const updateVehicle = (vehicle) => async (dispatch) => {
    try {
        dispatch({ type: SET_LOADING });
        const { data } = await axios.put(`/api/vehicles`, vehicle);
        dispatch({ type: UPDATE_VEHICLE, payload: data });
        dispatch(
            setAlert("Vehicle updated successfully", "primary", "vehicle_modal")
        );
    } catch (error) {
        dispatch({ type: VEHICLES_ERROR });
        console.error(error);
    }
};

export const toggleStatus = (id, status) => async (dispatch) => {
    try {
        const { data } = await axios.patch(`/api/vehicles/${id}`, status);
        dispatch({ type: TOGGLE_STATUS, payload: data });
    } catch (error) {
        dispatch({ type: VEHICLES_ERROR });
        console.error(error);
    }
};
