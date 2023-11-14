import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./restaurantSlice";
import ownerReducer from "./ownerSlice";
import notificationReducer from "./notificationSlice.js";

const rootReducer = {
  restaurant: restaurantReducer,
  owner: ownerReducer,
  notification: notificationReducer,

};

const store = configureStore({
  reducer: rootReducer,
});

export default store;