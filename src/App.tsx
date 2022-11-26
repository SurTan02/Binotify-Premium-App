import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import "./App.css";
import Register from "./pages/Register";
import AuthContext from "./context/auth.context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Routes>
        {authCtx.token === "" ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : authCtx.isAdmin ? (
          <>
            <Route path="/" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
