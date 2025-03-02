import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Rule from "./pages/Rule";
import Calc from "./pages/Calc";
import Game from "./pages/Game";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css";

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("user");

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("다시 로그인 해주세요");
    } else {
      toast.success("환영합니다");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover={true}
      />
      {isMobile ? (
        <>
          <Header user={user} onLogout={() => setUser(null)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rule" element={<Rule />}></Route>
            <Route
              path="/calc"
              element={
                <ProtectedRoute>
                  <Calc />
                </ProtectedRoute>
              }
            />
            <Route path="/game" element={<Game />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/login" element={<Login onLogin={setUser} />}></Route>
          </Routes>
          <Footer />
        </>
      ) : (
        <div className="desktop-message">
          📢 모바일 환경에서만 볼 수 있습니다.
        </div>
      )}
    </div>
  );
}

export default App;
