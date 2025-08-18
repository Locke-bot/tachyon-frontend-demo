// action - state management
import { CHANGE_PASSWORD, LOGIN, LOGOUT, REGISTER, PROFILE } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

// eslint-disable-next-line
const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: {
            const { user } = action.payload;
            return {
                ...state,
                user
            };
        }
        case LOGIN: {
            const { user } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                user
            };
        }
        case PROFILE: {
            const { user } = action.payload;
            return {
                ...state,
                user
            };
        }
        case CHANGE_PASSWORD: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
