import {
    SET_LOADING,
    REMOVE_LOADING,
    GET_ALL_VEHICLES,
    NEW_VEHICLE,
    UPDATE_VEHICLE,
    TOGGLE_STATUS,
    DELETE_VEHICLE,
    VEHICLES_ERROR,
} from "../actions/vehicles";

const initialState = {
    loading: true,
    vehicles: [],
};

export default function vehiclesReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING: {
            return {
                ...state,
                loading: true,
            };
        }
        case REMOVE_LOADING: {
            return {
                ...state,
                loading: false,
            };
        }
        case GET_ALL_VEHICLES:
            return {
                loading: false,
                vehicles: payload,
            };
        case NEW_VEHICLE: {
            return {
                ...state,
                loading: false,
                vehicles: [...state.vehicles, payload],
            };
        }
        case UPDATE_VEHICLE:
        case TOGGLE_STATUS:
            return {
                ...state,
                loading: false,
                vehicles: state.vehicles.map((vehicle) =>
                    vehicle._id === payload._id ? { ...payload } : vehicle
                ),
            };
        case DELETE_VEHICLE:
            console.log(payload);
            return {
                ...state,
                loading: false,
                vehicles: state.vehicles.filter(
                    (vehicle) => vehicle._id !== payload
                ),
            };
        case VEHICLES_ERROR: {
            return {
                ...state,
                loading: false,
            };
        }
        default:
            return state;
    }
}
