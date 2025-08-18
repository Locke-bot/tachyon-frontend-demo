import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarToggle: false,
  mode: "simple",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setSidebarToggle: (state, action) => {
      localStorage.setItem("sidebarCollapsed", action.payload);
      state.sidebarToggle = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setMode,
  setSidebarToggle,
} = uiSlice.actions;

export default uiSlice.reducer;
