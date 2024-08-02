import { useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import RegistrPage from "./pages/RegistrPage";
import LoginPage from "./pages/LoginPage/index.jsx";
import Home from "./pages/Home";
function App() {
  const navigate = useNavigate();
  function protectedRoute({ isAuthenticated, children }) {
    if (!isAuthenticated) {
      navigate("/login");
    }
    return children;
  }

  return (
    <Routes>
      {/* <RegistrPage/> */}
      <Route path="/registr" element={<RegistrPage></RegistrPage>}></Route>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/home"  element={<Home></Home>}></Route>
      <Route path="/details"  element={<Home></Home>}></Route>
    </Routes>
  );
}

export default App;
