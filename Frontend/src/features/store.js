import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./restaurantSlice";
import ownerReducer from "./ownerSlice";

const rootReducer = {
  restaurant: restaurantReducer,
  owner : ownerReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;