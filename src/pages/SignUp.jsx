import { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateNickname = (nickname) => {
    const nicknameRegex = /^[가-힣]{1,4}$/;
    return nicknameRegex.test(nickname);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
      toast.error("❌ 올바른 이메일 형식이 아닙니다.");
    }
    if (!validatePassword(password)) {
      newErrors.password = "비밀번호는 6자리 이상이어야 합니다.";
      toast.error("🔑 비밀번호는 6자리 이상이어야 합니다.");
    }
    if (!validateNickname(nickname)) {
      newErrors.nickname = "닉네임은 한글 1~4글자만 가능합니다.";
      toast.error("⚠️ 닉네임은 한글 1~4글자만 가능합니다.");
    }

    setErrors(newErrors);

    // 유효성 검사 통과 시 Firebase 회원가입 진행
    if (Object.keys(newErrors).length === 0) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: nickname,
        });

        toast.success(`🎉 회원가입 성공! 환영합니다, ${nickname}님!`);
        console.log("회원가입 완료:", user);

        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: nickname,
          })
        );

        setEmail("");
        setPassword("");
        setNickname("");

        setTimeout(() => {
          navigate("/login");
        }, 1400);
      } catch (error) {
        console.error("회원가입 오류:", error);
        toast.error(`회원가입 실패: ${error.message}`);
      }
    }
  };

  return (
    <>
      <section className="signUp-wrap">
        <div className="signUp-card">
          <h1>회원가입</h1>
          <form className="signUp-form" onSubmit={handleSubmit}>
            <div className="form-box">
              <label>이메일</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-box">
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="form-box">
              <label>닉네임</label>
              <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              {errors.nickname && <p className="error">{errors.nickname}</p>}
            </div>

            <button type="submit">회원가입 하기</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUp;
