import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    // just add all the operations u want to operate on the user
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

// Now  export actions and reducer
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
