import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Rule from "./pages/Rule";
import Room from "./pages/Room";
import Calc from "./pages/Calc";
import Game from "./pages/Game";
import Meeting from "./pages/Meeting";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css";

function ProtectedRoute({ user, children }) {
  const isAuthenticated = !!user;
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!hasShownToast.current) {
      if (!isAuthenticated) {
        toast.error("로그인 후 이용하세요");
      } else {
        toast.success("환영합니다");
      }
      hasShownToast.current = true;
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Firebase 로그인 상태 감지
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(
        u ? { uid: u.uid, email: u.email, displayName: u.displayName } : null
      );
    });
    return unsub;
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
          <Header user={user} onLogout={() => auth.signOut()} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rule" element={<Rule />}></Route>
            <Route path="/room" element={<Room />}></Route>
            <Route
              path="/calc"
              element={
                <ProtectedRoute user={user}>
                  <Calc />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game"
              element={
                <ProtectedRoute>
                  <Game />
                </ProtectedRoute>
              }
            />
            <Route
              path="/meeting"
              element={
                <ProtectedRoute>
                  <Meeting />
                </ProtectedRoute>
              }
            />
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
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

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
};
