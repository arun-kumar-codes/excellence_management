import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listProjectLog } from "../../../api/fixedhoursapi";

export const listProjectAllLog = createAsyncThunk(
  "/listProjectLog",
  async (projectid: any, thunkAPI) => {
    try {
      const listprojectdata = await listProjectLog(projectid);
      return listprojectdata;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: any = {
  isprojectLoglistloading: false,
  projectLoglistingFailed: true,
  projectLoglistingSuccess: false,
  projectLogData: [],
  errorMsg: ""
};

const listProjectLogSlice = createSlice({
  name: "listProjectLogSlice",
  initialState,
  reducers: {
    resetListLogProject: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(listProjectAllLog.fulfilled, (state, action) => {
      state.isprojectLoglistloading = false;
      state.projectLoglistingFailed = false;
      state.projectLoglistingSuccess = true;
      state.projectLogData = action.payload;
      state.errorMsg = "";
    });
    builder.addCase(listProjectAllLog.rejected, (state, action: any) => {
      state.isprojectLoglistloading = false;
      state.projectLoglistingFailed = true;
      state.projectLoglistingSuccess = false;
      state.errorMsg = action.payload;
    });
    builder.addCase(listProjectAllLog.pending, (state, { payload }) => {
      state.isprojectLoglistloading = true;
      state.projectLoglistingFailed = false;
      state.projectLoglistingSuccess = false;
      state.errorMsg = "";
    });
  }
});

export const { resetListLogProject } = listProjectLogSlice.actions;

export default listProjectLogSlice.reducer;
