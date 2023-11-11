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
      state.ownerId = action.payload;
    },
    setOwnerId: (state, action) => {
      state.showOwnerDetails = action.payload;
    },
  },
});

export const {
    setOwnerShowDetails,
    setOwnerId,
  } = ownerSlice.actions;
  
  export default ownerSlice.reducer;