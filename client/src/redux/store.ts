import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertSlice } from "./alertSlice";
import { userSlice } from "./userSlice";
import { doctorSlice } from "./doctorSlice";

const rootReducer = combineReducers({
  alert: alertSlice.reducer,
  auth: userSlice.reducer,
  doctor: doctorSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
