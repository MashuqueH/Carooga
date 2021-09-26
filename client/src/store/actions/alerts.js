import { v4 as uuid } from "uuid";

export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const REMOVE_ALERTS = "REMOVE_ALERTS";

export const setAlert = (msg, color, type) => (dispatch) => {
    const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: {
            msg,
            color,
            id,
            type,
        },
    });
};

export const removeAlert = (id) => (dispatch) => {
    dispatch({
        type: REMOVE_ALERT,
        payload: id,
    });
};

export const removeAlerts = (type) => (dispatch, getState) => {
    if (getState().alerts.length !== 0) {
        dispatch({
            type: REMOVE_ALERTS,
            payload: type,
        });
    }
};
