import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { toast } from "react-toastify";
import CalcCard from "../components/Calc/CalcCard";
import CalcModal from "../components/Modal/CalcAddModal";
import ModalForm from "../common/Modal/ModalForm";
import UploadIcon from "../assets/icons/upload.svg";
import "../styles/Calc.css";

function Calc({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  // 🔒 로그인된 뒤에만 구독
  // useEffect(() => {
  //   if (!auth.currentUser) return;

  //   const unsub = onSnapshot(collection(db, "events"), (snap) => {
  //     const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  //     list.sort(
  //       (a, b) => (b.created?.seconds ?? 0) - (a.created?.seconds ?? 0)
  //     );
  //     setEvents(list);
  //   });
  //   return unsub;
  // }, [auth.currentUser]);

  // 로그인 여부와 무관하게 구독
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "events"), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      list.sort(
        (a, b) => (b.created?.seconds ?? 0) - (a.created?.seconds ?? 0)
      );
      setEvents(list);
    });
    return unsub;
  }, []);

  // 자식(modal)에서 호출할 addEvent 콜백
  const addEvent = useCallback(async (ev) => {
    await addDoc(collection(db, "events"), {
      ...ev,
      created: serverTimestamp(),
      // createdBy: auth.currentUser.uid,
      createdBy: auth.currentUser?.uid ?? null,
    });
    setIsModalOpen(false);
  }, []);

  // 이벤트 삭제
  const deleteEvent = useCallback(async (id) => {
    if (!window.confirm("정말 삭제할까요?")) return;
    await deleteDoc(doc(db, "events", id));
  }, []);

  const enterEvent = (ev) => {
    const pw = window.prompt("비밀번호 4자리를 입력하세요");
    if (!pw) return;
    if (pw === ev.password) {
      navigate(`/calcMain/${ev.id}`, { state: ev });
    } else {
      toast.error("비밀번호가 일치하지 않습니다.");
    }
  };

  /** 🔍 keyword가 있으면 제목(title)에 포함되는 데이터만 반환 */
  const visibleEvents = useMemo(() => {
    if (!keyword.trim()) return events; // 공백이면 전체 반환
    return events.filter((ev) =>
      (ev.title ?? "") // title 필드가 있다고 가정
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );
  }, [events, keyword]);

  return (
    <>
      <section className="calc-wrap">
        <div className="calc-top">
          <input
            type="text"
            placeholder="벙 이름으로 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={() => setIsModalOpen(true)}>
            <img src={UploadIcon} />
          </button>
        </div>

        <div className="calc-list">
          {visibleEvents.map((ev, idx) => (
            <div
              key={ev.id}
              onClick={() => enterEvent(ev)}
              style={{ cursor: "pointer" }}
            >
              <CalcCard
                index={idx + 1}
                event={ev}
                onDelete={deleteEvent}
                user={user}
              />
            </div>
          ))}
        </div>
      </section>
      <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CalcModal user={user} onSubmit={addEvent} />
      </ModalForm>
    </>
  );
}

export default Calc;

Calc.propTypes = {
  user: PropTypes.shape({
    // uid: PropTypes.string.isRequired,
    uid: PropTypes.string,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }),
};
