import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ownerId: null,
  showOwnerDetails: false,
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    setShowOwnerDetails: (state, action) => {
      state.showOwnerDetails = action.payload;
    },
    setOwnerId: (state, action) => {
      state.ownerId = action.payload;
    },
  },
});

export const { setShowOwnerDetails, setOwnerId } = ownerSlice.actions;

export default ownerSlice.reducer;
