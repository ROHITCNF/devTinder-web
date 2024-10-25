import { createSlice } from "@reduxjs/toolkit";

const feedSclice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      return null;
    },
  },
});

export const { addFeed } = feedSclice.actions;
export default feedSclice.reducer;
