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

/* ---------------- ProtectedRoute ---------------- */
function ProtectedRoute({ user, ready, children }) {
  const isAuthenticated = !!user;
  const toastShown = useRef(false);

  useEffect(() => {
    if (!ready) return; // 로딩 스피너 차후에 넣기
    if (toastShown.current) return;
    toast[isAuthenticated ? "success" : "error"](
      isAuthenticated ? "환영합니다" : "로그인 후 이용하세요"
    );
    toastShown.current = true;
  }, [ready, isAuthenticated]);

  if (!ready) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object,
  ready: PropTypes.bool,
};

/* ---------------- App ---------------- */
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Firebase 로그인 상태 구독
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(
        u ? { uid: u.uid, email: u.email, displayName: u.displayName } : null
      );
      setAuthReady(true);
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
                <ProtectedRoute user={user} ready={authReady}>
                  <Calc user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game"
              element={
                <ProtectedRoute user={user} ready={authReady}>
                  <Game />
                </ProtectedRoute>
              }
            />
            <Route
              path="/meeting"
              element={
                <ProtectedRoute user={user} ready={authReady}>
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
