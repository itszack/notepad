import { GET_NOTES } from '../actions/types';

const initialState = {
    notes: {},
    isLoading: true,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_NOTES:
            return {
                ...state,
                isLoading: false,
                notes: payload,
            };
        default:
            return state;
    }
}
