import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import LoginComponent from "./components/session/Login";
import RegisterComponent from "./components/session/Register";
import Header from "./components/general/Header";

function App() {
  return (
    <Router>
      <Header />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
