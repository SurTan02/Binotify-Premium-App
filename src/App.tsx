import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import "./App.css";
import EditSongForm from "./components/EditSongForm";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        {/* <Route  path="/home" exact element={<Home/>} />
        <Route  path="/song/:id" exact element={<Songs/>} />
        <Route  path="/add-song" exact element={<Add/>} /> */}
        <Route path="/edit-song/:id" exact element={<EditSongForm />} />
      </Routes>
    </div>
  );
}

export default App;
