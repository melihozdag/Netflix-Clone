import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/userSlice";
import movieReducer from "../features/movieSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    movie: movieReducer,
  },
});
