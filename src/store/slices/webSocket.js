import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastMessage: null,
  newMessage: null,
};

export const webSocketSlice = createSlice({
  name: "webSocket",
  initialState,
  reducers: {
    setLastMessage: (state, action) => {
      state.lastMessage = action.payload;
    },
    setNewMessage: (state, action) => {
      state.newMessage = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setLastMessage,
  setNewMessage,
} = webSocketSlice.actions;

export default webSocketSlice.reducer;