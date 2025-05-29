import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Rule from "./pages/Rule";
import Room from "./pages/Room";
import Calc from "./pages/Calc";
import CalcMain from "./components/Calc/CalcMain";
import Out from "./pages/Out";
import Suggestion from "./pages/Suggestion";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css";

/* ───────── Waiting(승인 대기) 페이지 ───────── */
function Waiting() {
  return (
    <div className="waiting">
      <h2>🕒 관리자 승인 대기중입니다</h2>
      <p>승인 완료 후 다시 로그인해 주세요.</p>
      <p>승인은 2방 관리자: 키텔 에게 문의하십시오.</p>
    </div>
  );
}

/* ───────── ProtectedRoute ───────── */
function ProtectedRoute({ user, ready, children }) {
  const isAuthenticated = !!user;
  const toastShown = useRef(false);

  useEffect(() => {
    if (!ready || toastShown.current) return;
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

/* ───────── App ───────── */
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ─ Firebase 로그인 & 승인 여부 체크 ─ */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        setUser(null);
        setAuthReady(true);
        return;
      }

      /* 승인 필드 조회 */
      (async () => {
        try {
          const snap = await getDoc(doc(db, "users", u.uid));
          const approved = snap.exists() ? snap.data().approved : false;

          if (!approved) {
            toast.info("관리자 승인 대기중입니다.");
            // await auth.signOut();
            // setUser(null);
            // setAuthReady(true);
            navigate("/waiting", { replace: true });
          } else {
            setUser({
              uid: u.uid,
              email: u.email,
              displayName: u.displayName,
            });
            setAuthReady(true);
          }
        } catch (err) {
          console.error(err);
          toast.error("로그인 상태 확인 중 오류가 발생했습니다.");
          await auth.signOut();
          setUser(null);
          setAuthReady(true);
        }
      })();
    });
    return unsub;
  }, [navigate]);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} pauseOnHover />
      {isMobile ? (
        <>
          <Header user={user} onLogout={() => auth.signOut()} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/waiting" element={<Waiting />} />
            <Route path="/rule" element={<Rule />} />
            <Route path="/room" element={<Room />} />
            <Route
              path="/calc"
              element={
                <ProtectedRoute user={user} ready={authReady}>
                  <Calc user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calcMain/:eventId"
              element={
                <ProtectedRoute user={user} ready={authReady}>
                  <CalcMain user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/out"
              element={
                <ProtectedRoute user={user} ready={authReady}>
                  <Out user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/suggestion"
              element={
                <ProtectedRoute user={user} ready={authReady}>
                  <Suggestion />
                </ProtectedRoute>
              }
            />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
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
  ready: PropTypes.bool,
};
