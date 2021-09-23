import { GET_ALL_VEHICLES } from "../actions/vehicles";

const initialState = {
    loading: true,
    vechiles: [],
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_VEHICLES:
            return {
                loading: false,
                vehicles: payload,
            };
        default:
            return state;
    }
}
