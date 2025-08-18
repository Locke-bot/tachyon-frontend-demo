import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { CHANGE_PASSWORD, LOGIN, LOGOUT, PROFILE } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';
import { logout as logout2 } from 'store/slices/chat';
import { useDispatch } from 'react-redux';

const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (accessToken) => {
    if (!accessToken) {
        return false;
    }
    const decoded = jwtDecode(accessToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (accessToken, refreshToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

export async function refreshToken() {
    try {
        const response = await axios.post(`api/token/refresh/`, {
            refresh: window.localStorage.getItem('refreshToken')
        });
        const { accessToken, refreshToken } = response.data;
        setSession(accessToken, refreshToken);
        return accessToken
    } catch (err) {
        if (err.response.status === 401) {
            setSession(null, null)
        }
        throw err
    }
}

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);
    const dispatch2 = useDispatch()
    useEffect(() => {
        const init = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');
                const refreshToken = window.localStorage.getItem('refreshToken');
                if (accessToken && verifyToken(accessToken)) {
                    setSession(accessToken, refreshToken);
                    axios.get('/api/account/me/')
                    .then((response) => {
                        const { user } = response.data;
                        dispatch({
                            type: LOGIN,
                            payload: {
                                isLoggedIn: true,
                                user
                            }
                        });
                    }).catch(() => {
                        dispatch2(logout2())
                        dispatch({
                            type: LOGOUT
                        });
                    })
                } else {
                    dispatch2(logout2())
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch2(logout2())
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('/api/account/login/', { email, password });
        const { accessToken, refreshToken, user } = response.data;
        setSession(accessToken, refreshToken);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        });
    };

    const register = async (email, password, firstName, lastName, token) => {
        // todo: this flow need to be recode as it not verified
        const response = await axios.post(`/api/account/register/${token}/`, {
            email,
            password,
            firstName,
            lastName
        });
        const { accessToken, refreshToken, user } = response.data;
        setSession(accessToken, refreshToken);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        });
    };

    const updateProfile = async (firstName, lastName) => {
        // todo: this flow need to be recode as it not verified
        const response = await axios.post('/api/account/me/', {
            firstName,
            lastName
        });
        const { user } = response.data;
        dispatch({
            type: PROFILE,
            payload: {
                user
            }
        });        
    };

    const logout = () => {
        setSession(null, null);
        dispatch2(logout2())
        dispatch2(logout3())
        dispatch({ type: LOGOUT });
    };

    const changePassword = async (oldPassword, newPassword) => {
        const response = await axios.post('/api/account/change-password/', {
            old_password: oldPassword,
            new_password: newPassword
        });
        dispatch({
            type: CHANGE_PASSWORD,
        });
    };

    const resetPasswordLink = async (email) => {
        const response = await axios.post('/api/account/confirm-mail/', {
            email
        });  
    };

    const resetPassword = async (password, uuid, token) => {
        const response = await axios.post(`/api/account/reset-password/${uuid}/${token}/`, {
            password
        });  
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, changePassword, login, logout, register, resetPasswordLink, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
