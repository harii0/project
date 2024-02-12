import { createSlice } from "@reduxjs/toolkit";
export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    loading: false,
  },
  reducers: {
    Showloading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});
export const { Showloading, hideLoading } = alertSlice.actions;
export default alertSlice.reducer;
