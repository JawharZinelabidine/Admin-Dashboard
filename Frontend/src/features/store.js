import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./restaurantSlice";

const rootReducer = {
  restaurant: restaurantReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;