import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantId: null,
  showRestaurantDetails: false,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setShowRestaurantDetails: (state, action) => {
      state.restaurantId = action.payload;
    },
    setRestaurantId: (state, action) => {
      state.showRestaurantDetails = action.payload;
    },
  },
});

export const {
    setShowRestaurantDetails,
    setRestaurantId,
  } = restaurantSlice.actions;
  
  export default restaurantSlice.reducer;
