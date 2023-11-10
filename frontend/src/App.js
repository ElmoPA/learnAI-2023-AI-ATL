import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Component/Navigation";
import Function from "./Component/Function";
import Login from "./Component/Login/Login";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/main"></Route>
          <Route path="/function" element={<Function />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
