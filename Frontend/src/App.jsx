import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewApplication from "./components/NewApplication";
import RestaurantList from "./components/RestaurantList";
import History from "./components/History"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Dashboard />
            </>
          }
        />
        <Route
          path="/NewApplication"
          element={
            <>
              <NewApplication />
            </>
          }
        />
         <Route
          path="/RestaurantList"
          element={
            <>
              <RestaurantList />
              </>
          }
          />
        <Route
          path="/history"
          element={
            <>
              <History />
            </>
          }
        />
       
      </Routes>
    </Router>
  );
}

export default App;
