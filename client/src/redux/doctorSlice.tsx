import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DoctorState {
  doctor: {
    username: string;
    email: string;
    bio: string;
    id: string;
    age: number;
    profileImage: string;
    role: string[];
  } | null;
  reloadUser: boolean;
}

const initialState: DoctorState = {
  doctor: null,
  reloadUser: true,
};

export const doctorSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDoctor: (state, action: PayloadAction<DoctorState["doctor"]>) => {
      state.doctor = action.payload;
    },
    reloadUserData: (state, action: PayloadAction<boolean>) => {
      state.reloadUser = action.payload;
    },
  },
});

export const { setDoctor, reloadUserData } = doctorSlice.actions;

export default doctorSlice.reducer;
