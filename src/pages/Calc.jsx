import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
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
import CalcCard from "../components/Calc/CalcCard";
import CalcModal from "../components/Modal/CalcAddModal";
import ModalForm from "../common/Modal/ModalForm";
import UploadIcon from "../assets/icons/upload.svg";
import "../styles/Calc.css";

function Calc({ user }) {
  // 모달 & 목록 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  // 🔒 로그인된 뒤에만 구독
  useEffect(() => {
    if (!auth.currentUser) return; // 로그인 전이면 패스

    const unsub = onSnapshot(collection(db, "events"), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      list.sort(
        (a, b) => (b.created?.seconds ?? 0) - (a.created?.seconds ?? 0)
      );
      setEvents(list);
    });
    return unsub;
  }, [auth.currentUser]);

  // 자식(modal)에서 호출할 addEvent 콜백
  const addEvent = useCallback(async (ev) => {
    await addDoc(collection(db, "events"), {
      ...ev,
      created: serverTimestamp(),
      createdBy: auth.currentUser.uid,
    });
    setIsModalOpen(false);
  }, []);

  // 이벤트 삭제
  const deleteEvent = useCallback(async (id) => {
    if (!window.confirm("정말 삭제할까요?")) return;
    await deleteDoc(doc(db, "events", id));
  }, []);

  return (
    <>
      <section className="calc-wrap">
        <div className="calc-top">
          <input type="text" placeholder="벙 이름으로 검색" />
          <button onClick={() => setIsModalOpen(true)}>
            <img src={UploadIcon} />
          </button>
        </div>

        <div>
          {events.map((ev, idx) => (
            <Link
              key={ev.id}
              to={`/calcMain/${ev.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CalcCard
                index={idx + 1}
                event={ev}
                onDelete={deleteEvent}
                user={user}
              />
            </Link>
          ))}
        </div>
      </section>
      <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CalcModal onSubmit={addEvent} />
      </ModalForm>
    </>
  );
}

export default Calc;

Calc.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }),
};
