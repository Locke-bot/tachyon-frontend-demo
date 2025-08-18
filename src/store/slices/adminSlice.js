import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authAxios from 'utils/axios';

const initialState = {
  adminCourse: "",
  adminCourses: [],
  courseSeries: [],
  courseUsers: {},
  userPrompts: [],
  stats: {},
};

export const fetchAdminCourses = createAsyncThunk(
  "course/fetchAdminCourses",
  async (arg, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      let response = await authAxios(`api/admin/courses/`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCourseUsers = createAsyncThunk(
  "course/fetchCourseUsers",
  async (arg, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      let response = await authAxios(`api/admin/users/${state.adminData.adminCourses[state.adminData.adminCourse]}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserPrompts = createAsyncThunk(
  "course/fetchUserPrompts",
  async (arg, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      let response = await authAxios.get(`api/admin/prompts/${state.adminData.adminCourses[state.adminData.adminCourse]}/${arg.uuid}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCourseStats = createAsyncThunk(
  "course/fetchCourseStats",
  async (arg, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      let response = await authAxios.get(`api/admin/stats/${state.adminData.adminCourses[state.adminData.adminCourse]}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCourseTimeSeries = createAsyncThunk(
  "course/fetchCourseTimeSeries",
  async (arg, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      let response = await authAxios.get(`api/admin/time-series/${state.adminData.adminCourses[state.adminData.adminCourse]}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminCourse: (state, action) => {
      state.adminCourse = action.payload;
    },
    setAdminCourses: (state, action) => {
      state.adminCourses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminCourses.pending, (state) => {
      })
      .addCase(fetchAdminCourses.fulfilled, (state, action) => {
        state.adminCourses = action.payload;
      })
      .addCase(fetchAdminCourses.rejected, (state) => {})  

      .addCase(fetchCourseUsers.pending, (state) => {
        state.courseUsers = {};
      })
      .addCase(fetchCourseUsers.fulfilled, (state, action) => {
        state.courseUsers = action.payload;
      })
      .addCase(fetchCourseUsers.rejected, (state) => {})

      .addCase(fetchUserPrompts.pending, (state) => {
        state.userPrompts = []
      })
      .addCase(fetchUserPrompts.fulfilled, (state, action) => {
        state.userPrompts = action.payload;
      })
      .addCase(fetchUserPrompts.rejected, (state) => {})

      .addCase(fetchCourseStats.pending, (state) => {
        state.stats = {}
      })
      .addCase(fetchCourseStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(fetchCourseStats.rejected, (state) => {})

      .addCase(fetchCourseTimeSeries.pending, (state) => {
        state.courseSeries = []
      })
      .addCase(fetchCourseTimeSeries.fulfilled, (state, action) => {
        state.courseSeries = action.payload;
      })
      .addCase(fetchCourseTimeSeries.rejected, (state) => {})
  },
});

export const {
    setAdminCourse,
    setAdminCourses,
} = adminSlice.actions;

export default adminSlice.reducer;
