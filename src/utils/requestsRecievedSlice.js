import { createSlice } from "@reduxjs/toolkit";

const requestsReceivedSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => null,
  },
});

export const { addRequests, removeRequests } = requestsReceivedSlice.actions;
export default requestsReceivedSlice.reducer;
