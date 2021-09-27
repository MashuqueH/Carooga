import { SET_ALERT, REMOVE_ALERTS, REMOVE_ALERT } from "../actions/alerts";

const initialState = [];

export default function alertsReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            if (
                state.filter((alert) => alert.msg === payload.msg).length === 0
            ) {
                return [...state, payload];
            }
            return state;
        case REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload);
        case REMOVE_ALERTS:
            return state.filter((alert) => alert.type === payload.type);
        default:
            return state;
    }
}
