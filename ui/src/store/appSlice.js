import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool: "pencile",
  action: "none",
  color: "#000000",
};

export const AppSlice = createSlice({
  name: "svgPoint",
  initialState,
  reducers: {
    handleActionSelection: (state, { payload }) => {
      state.action = payload;
    },
    handleToolSelection: (state, { payload }) => {
      state.tool = payload;
    },
    handleColorSelection: (state, { payload }) => {
      state.color = payload;
    },
  },
});

export const {
  handleActionSelection,
  handleToolSelection,
  handleColorSelection,
} = AppSlice.actions;
export default AppSlice.reducer;
