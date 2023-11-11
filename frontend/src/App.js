import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Component/Navigation";
import Function from "./Component/Function";
import Login from "./Component/Login/Login";
import Subject from "./Component/Subject/Subject";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/main"></Route>
          <Route path="/function" element={<Function />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/subject/:subjectId" element={<Subject />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
