import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: (state, action) => null,
  },
});

export const { addConnections, removeAllConnections } =
  connectionsSlice.actions;
export default connectionsSlice.reducer;
