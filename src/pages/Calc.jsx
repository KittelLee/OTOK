import { useState, useEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import CalcCard from "../components/Calc/CalcCard";
import CalcModal from "../components/Modal/CalcAddModal";
import ModalForm from "../common/Modal/ModalForm";
import UploadIcon from "../assets/icons/upload.svg";
import "../styles/Calc.css";

function Calc() {
  // 모달 & 목록 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  // Firestore 구독
  useEffect(() => {
    const q = collection(db, "events");
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // 최신 → 오래된 순 정렬 (원하면 created 필드 기준)
      list.sort((a, b) => b.created - a.created);
      setEvents(list);
    });
    return () => unsub();
  }, []);

  // 자식(modal)에서 호출할 addEvent 콜백
  const addEvent = useCallback(async (ev) => {
    await addDoc(collection(db, "events"), {
      ...ev,
      created: serverTimestamp(),
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
            <CalcCard
              key={ev.id}
              index={idx + 1}
              event={ev}
              onDelete={deleteEvent}
            />
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
