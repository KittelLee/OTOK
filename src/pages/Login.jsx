import { useState } from "react";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      onLogin({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });

      toast.success(`🎉 환영합니다, ${user.email}!`, {
        autoClose: 1000,
        pauseOnHover: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("로그인 오류:", error);
      toast.error(`로그인 실패: ${error.message}`);
    }
  };

  return (
    <>
      <section className="login-wrap">
        <div className="login-card">
          <h1>로그인</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-box">
              <label>이메일</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-box">
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">로그인 하기</button>
          </form>
        </div>
      </section>
    </>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
