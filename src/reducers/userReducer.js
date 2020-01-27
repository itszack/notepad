import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../helpers/isEmpty';

const initalState = {
    isAuthenticated: false,
    user: {},
    isLoading: true,
};

export default function(state = initalState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(payload),
                isLoading: false,
                user: payload,
            };
        default:
            return state;
    }
}
