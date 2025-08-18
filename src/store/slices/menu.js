import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';
import axios from 'utils/axios';

// initial state
const initialState = {
    selectedItem: ['dashboard'],
    selectedID: null,
    drawerOpen: false,
    error: null,
    menu: {},
    disabled: false, // NOTE:  set false to enable side menu
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.selectedItem = action.payload;
        },

        activeID(state, action) {
            state.selectedID = action.payload;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload;
        },

        // has error
        hasError(state, action) {
            state.error = action.payload;
        },

        // get dashboard menu
        getMenuSuccess(state, action) {
            state.menu = action.payload;
        },

        // chat
        setDisabled(state, action) {
            state.disabled = action.payload;
            if (action.payload) {
                state.drawerOpen = false;
            }
        },  
    }
});

export default menu.reducer;

export const { activeItem, openDrawer, activeID, setDisabled } = menu.actions;

export function getMenu() {
    return async () => {
        try {
            const response = await axios.get('/api/menu/widget');
            dispatch(menu.actions.getMenuSuccess(response.data.widget));
        } catch (error) {
            dispatch(menu.actions.hasError(error));
        }
    };
}
