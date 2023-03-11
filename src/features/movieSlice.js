import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMovie: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const { setSelectedMovie } = movieSlice.actions;

export const selectSelectedMovie = (state) => state.movie.selectedMovie;

export default movieSlice.reducer;
