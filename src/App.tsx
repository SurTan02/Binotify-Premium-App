import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route  path="/home" exact element={<Home/>} />
        <Route  path="/song/:id" exact element={<Songs/>} />
        <Route  path="/add-song" exact element={<Add/>} />
        <Route  path="/edit-song/:id" exact element={<Edit/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
