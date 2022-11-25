import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import "./App.css";
import EditSongForm from "./components/EditSongForm";

function App() {
  return (
    <div className="App relative">
      <Routes>
        <Route path="/" element={<Home />} />
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
