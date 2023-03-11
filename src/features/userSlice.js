import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    unsubscribe: (state) => {
      state.user = null;
    },
  },
});

export const { signUp, login, logout, unsubscribe } = authSlice.actions;

export const selectUser = (state) => state.user.user;

export default authSlice.reducer;
