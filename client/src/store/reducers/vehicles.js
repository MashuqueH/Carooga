import {
    GET_ALL_VEHICLES,
    NEW_VEHICLE,
    UPDATE_VEHICLE,
    TOGGLE_STATUS,
} from "../actions/vehicles";

const initialState = {
    loading: true,
    vehicles: [],
};

export default function vehiclesReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_VEHICLES:
            return {
                loading: false,
                vehicles: payload,
            };
        case NEW_VEHICLE: {
            return {
                ...state,
                vehicles: [payload, ...state.vehicles],
            };
        }
        case UPDATE_VEHICLE:
        case TOGGLE_STATUS:
            return {
                ...state,
                vehicles: state.vehicles.map((vehicle) =>
                    vehicle._id === payload._id ? { ...payload } : vehicle
                ),
            };
        default:
            return state;
    }
}
