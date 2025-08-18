import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import isEqual from 'lodash/isEqual';

import authAxios, { localAxiosServices } from "../../utils/axios";

const initialState = {
  currentChat: {},
  currentThreadId: "",
  currentRunId: "",
  timeline: {}, // key is node and the value is [progress(start|end), optional_detail]
  threadsPreview: {},
  answer: "",
  threadGraphType: null,
};

export const fetchThreadsPreview = createAsyncThunk(
  "chat/fetchThreadsPreview",
  async (arg, thunkAPI) => {
    try {
      let response = await localAxiosServices.get(`api/v1/threads/preview/`);
      return { data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteThread = createAsyncThunk(
  "chat/deleteThread",
  async (arg, thunkAPI) => {
    try {
      let response = await localAxiosServices.delete(`api/v1/threads/delete/${arg.uuid}/`);
      return { uuid: arg.uuid };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchThreadRuns = createAsyncThunk(
  "chat/fetchThreadRuns",
  async (arg, thunkAPI) => {
    try {
      let response = await localAxiosServices.get(`api/v1/runs/${arg.uuid}/`);
      return { data: response.data, uuid: arg.uuid };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setTimeline: (state, action) => {
      state.timeline = action.payload;
    },
    setCurrentThreadId: (state, action) => {
      state.currentThreadId = action.payload;
    },
    setCurrentRunId: (state, action) => {
      state.currentRunId = action.payload;
    },
    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
    setThreadGraphType: (state, action) => {
      state.threadGraphType = action.payload;
    },
    logout: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = initialState[key];
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadsPreview.pending, (state) => {
      })
      .addCase(fetchThreadsPreview.fulfilled, (state, action) => {
        state.threadsPreview = action.payload.data;
      })

      .addCase(fetchThreadRuns.pending, (state) => {
      })
      .addCase(fetchThreadRuns.fulfilled, (state, action) => {
        let timelines = action.payload.data["timelines"]
        let runs = action.payload.data["runs"]
        console.log(action.payload.uuid === state.currentThreadId, state.currentThreadId);
        // if (action.payload.uuid === state.currentThreadId) {
        //   state.currentChat = {...state.currentChat, ...runs};
        // } else {
          // }
        state.currentChat = runs;
        state.timeline = {...state.timeline, ...timelines};
        state.threadGraphType = action.payload.data["graph_type"].toUpperCase()
      })

      .addCase(deleteThread.pending, (state) => {
      })
      .addCase(deleteThread.fulfilled, (state, action) => {
        let uuid = action.payload.uuid
        if (uuid === state.currentThreadId) {
          state.currentThreadId = "";
        }
      })
  },
});

export const {
  logout,
  setCurrentChat,
  setCurrentRunId,
  setCurrentThreadId,
  setTimeline,
  setAnswer,
  setThreadGraphType,
} = chatSlice.actions;

export default chatSlice.reducer;