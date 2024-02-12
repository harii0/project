import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    username: string;
    email: string;
    bio: string;
    id: string;
    age: number;
    profileImage: string;
    role: string[];
    seenNotifications: string[]; // Assuming these are IDs of notifications
    UnseenNotifications: string[]; // Assuming these are IDs of notifications
  } | null;
  reloadUser: boolean;
}

const initialState: UserState = {
  user: null,
  reloadUser: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },
    reloadUserData: (state, action: PayloadAction<boolean>) => {
      state.reloadUser = action.payload;
    },
  },
});

export const { setUser, reloadUserData } = userSlice.actions;

export default userSlice.reducer;
