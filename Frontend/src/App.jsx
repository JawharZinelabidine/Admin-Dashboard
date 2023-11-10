import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import './App.css'
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Home />} />
    </Routes>
  </Router>
  )
}

export default App
