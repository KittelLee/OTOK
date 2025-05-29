import { useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

function SignUp() {
  const [form, setForm] = useState({ email: "", password: "", nickname: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  /* 각 필드 유효성 */
  const rules = {
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    password: (v) => v.length >= 6,
    nickname: (v) => /^[가-힣]{1,4}$/.test(v),
  };

  /* 전체 검증 & 중복 닉네임 체크 */
  const validate = async () => {
    const temp = {};
    if (!rules.email(form.email)) temp.email = "올바른 이메일 형식이 아닙니다.";
    if (!rules.password(form.password))
      temp.password = "비밀번호는 6자리 이상이어야 합니다.";
    if (!rules.nickname(form.nickname))
      temp.nickname = "닉네임은 한글 1~4글자만 가능합니다.";

    // 닉네임 중복
    if (!temp.nickname) {
      const dup = await getDocs(
        query(
          collection(db, "users"),
          where("displayName", "==", form.nickname),
          limit(1)
        )
      );
      if (!dup.empty) temp.nickname = "이미 사용 중인 닉네임입니다.";
    }

    setErrors(temp);
    Object.values(temp).forEach((msg) => toast.error(msg));
    return Object.keys(temp).length === 0;
  };

  /* 제출 */
  /* 제출 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(await validate())) return;

    try {
      /* 1) 계정 생성 */
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      /* 2) displayName 업데이트 */
      await updateProfile(user, { displayName: form.nickname });

      /* 3) 토큰이 준비될 때까지 기다렸다가 문서 작성 */
      const unsub = onAuthStateChanged(auth, async (u) => {
        console.log("👀 onAuthStateChanged fired:", u?.uid);
        if (!u) return; // 토큰이 아직 없으면 u == null
        if (u.uid !== user.uid) return; // 다른 세션 보호
        unsub(); // 한 번만 실행하고 리스너 해제
        console.log("📝 about to setDoc");

        try {
          await setDoc(
            doc(db, "users", u.uid),
            {
              displayName: form.nickname,
              email: form.email,
              approved: false,
              createdAt: serverTimestamp(),
            },
            { merge: true }
          );

          toast.success("🎉 회원가입 신청 완료!");
          toast.info("관리자 승인 대기중입니다. 승인 후 이용 가능합니다.");
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid: u.uid,
              email: form.email,
              displayName: form.nickname,
              approved: false,
            })
          );
          setForm({ email: "", password: "", nickname: "" });
          navigate("/waiting");
        } catch (err) {
          console.error("❌ setDoc 실패:", err.code, err.message);
          toast.error(`회원가입 실패: ${err.message}`);
        }
      });
    } catch (err) {
      console.error("회원가입 기본 절차 실패:", err.code, err.message);
      toast.error(`회원가입 실패: ${err.message}`);
    }
  };

  return (
    <>
      <section className="signUp-wrap">
        <div className="signUp-card">
          <h1>회원가입</h1>
          <form className="signUp-form" onSubmit={handleSubmit}>
            {[
              { key: "email", label: "이메일", type: "email" },
              { key: "password", label: "비밀번호", type: "password" },
              { key: "nickname", label: "닉네임", type: "text" },
            ].map(({ key, label, type }) => (
              <div className="form-box" key={key}>
                <label>{label}</label>
                <input
                  type={type}
                  placeholder={label}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
                {errors[key] && <p className="error">{errors[key]}</p>}
              </div>
            ))}
            <button type="submit">회원가입 하기</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUp;
