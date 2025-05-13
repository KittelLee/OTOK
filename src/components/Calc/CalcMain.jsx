import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import dayjs from "dayjs";
import AddChaModal from "../Modal/AddChaModal";
import "../../styles/Calc/CalcMain.css";

function CalcMain() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState(location.state || null);
  const [paidList, setPaidList] = useState([]); // ✅ 입금 완료
  const [pendingList, setPendingList] = useState([]); // ✅ 입금 미완료
  const [standByList, setStandByList] = useState([]); // ✅ 상보참
  const [chaList, setChaList] = useState([]);
  const [loading, setLoading] = useState(!location.state);
  const [showAddChaModal, setShowAddChaModal] = useState(false);

  // 🔢 총 인원 = 세 리스트 길이 합
  const totalCount = new Set([...paidList, ...pendingList, ...standByList])
    .size;

  useEffect(() => {
    if (!event) return;

    setChaList(Array.isArray(event.chas) ? event.chas : []);
    setPaidList(Array.isArray(event.paid) ? event.paid : []);
    setPendingList(Array.isArray(event.pending) ? event.pending : []);
    setStandByList(Array.isArray(event.standBy) ? event.standBy : []);
  }, [event]);

  /* 1) 공통 util – message 인자를 추가 */
  const appendPerson = async (list, setList, field, message) => {
    const name = window.prompt(message);
    if (!name) return;
    if (list.includes(name)) return alert("이미 등록된 이름입니다.");

    const next = [...list, name];
    setList(next);

    try {
      await updateDoc(doc(db, "events", eventId), { [field]: next });
    } catch (e) {
      console.error(e);
      alert("저장 실패");
    }
  };

  /* 2) 버튼별 래퍼 */
  const addPaidPerson = () =>
    appendPerson(
      paidList,
      setPaidList,
      "paid",
      "입금 완료자 이름을 입력하세요."
    );

  const addPendingPerson = () =>
    appendPerson(
      pendingList,
      setPendingList,
      "pending",
      "입금 미완료자 이름을 입력하세요."
    );

  const addStandByPerson = () =>
    appendPerson(
      standByList,
      setStandByList,
      "standBy",
      "상보참 이름을 입력하세요."
    );

  const openAddChaModal = () => {
    if (chaList.length >= 7) return alert("최대 7차까지만 추가할 수 있습니다.");
    setShowAddChaModal(true);
  };

  const confirmAddCha = async (newCha) => {
    const next = [...chaList, newCha];
    setChaList(next);
    try {
      await updateDoc(doc(db, "events", eventId), { chas: next });
    } catch (e) {
      console.error(e);
      alert("저장 실패");
    }
  };

  const removeCha = async () => {
    if (!chaList.length) return;
    const next = chaList.slice(0, -1);
    setChaList(next);
    try {
      await updateDoc(doc(db, "events", eventId), { chas: next });
    } catch (e) {
      console.error(e);
      alert("삭제 실패");
    }
  };

  const handleCopyAccount = async () => {
    if (!event?.account) {
      alert("등록된 계좌번호가 없습니다.");
      return;
    }
    try {
      await navigator.clipboard.writeText(event.account);
      alert("계좌번호가 클립보드에 복사되었습니다.");
    } catch (err) {
      console.error(err);
      alert("복사 권한이 거부되었거나 지원되지 않는 브라우저입니다.");
    }
  };

  useEffect(() => {
    if (event) return;

    const fetch = async () => {
      try {
        const snap = await getDoc(doc(db, "events", eventId));
        if (!snap.exists()) {
          alert("존재하지 않는 이벤트입니다.");
          return navigate("/calc", { replace: true });
        }
        setEvent({ id: snap.id, ...snap.data() });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [event, eventId, navigate]);

  if (loading) return <p style={{ padding: 24 }}>로딩 중…</p>;
  if (!event) return null;

  const fmt = (iso) => dayjs(iso).format("YYYY년 M월 D일 (dd) A h:mm");
  const period = event.end
    ? `${fmt(event.start)} ~ ${fmt(event.end)}`
    : fmt(event.start);

  return (
    <>
      <section className="calcMain-wrap">
        <div className="calcMain-top">
          <h1>{event.title}</h1>
          <p>일시 : {period}</p>
          <p>위치 : {event.place}</p>
          <p>벙주 : {event.host}</p>
          <p>정산방 카톡링크 : {event.link}</p>
          <div className="cash-wrap">
            <div className="cash-left">
              <p>선입금</p>
              <p>{event.bank}</p>
              <p>{event.fee}</p>
              <button onClick={handleCopyAccount}>계좌번호 복사</button>
            </div>
            <div className="cash-right">
              <div className="total-people">
                <p>총 인원 수</p>
                <p>{totalCount} 명</p>
              </div>
              <div className="bar" />
              <div className="cash-done">
                <button onClick={addPaidPerson}>입금 완료자 추가</button>
                <button onClick={addPendingPerson}>입금 미완료자 추가</button>
                <button onClick={addStandByPerson}>상보참 추가</button>
              </div>
            </div>
          </div>

          {/* ✅ 입금 완료 */}
          <div className="cash-complete">
            <p>
              입금 완료자 <b className="font-red">{paidList.length}명</b>
            </p>
            <div className="person-list">
              {paidList.length ? (
                paidList.map((n, i) => <p key={`${n}-${i}`}>{n}</p>)
              ) : (
                <p>없음</p>
              )}
            </div>
          </div>

          {/* ✅ 입금 미완료 */}
          <div className="cash-incomplete">
            <p>
              입금 미완료자 <b className="font-red">{pendingList.length}명</b>
            </p>
            <div className="person-list">
              {pendingList.length ? (
                pendingList.map((n, i) => <p key={`${n}-${i}`}>{n}</p>)
              ) : (
                <p>없음</p>
              )}
            </div>
          </div>

          {/* ✅ 상보참 */}
          <div className="standBy-people">
            <p>
              상보참 <b className="font-red">{standByList.length}명</b>
            </p>
            <div className="standBy-list">
              {standByList.length ? (
                standByList.map((n, i) => <p key={`${n}-${i}`}>{n}</p>)
              ) : (
                <p>없음</p>
              )}
            </div>
          </div>

          <div id="cha-plus">
            <button onClick={openAddChaModal}>N차 참 +</button>
            <button onClick={removeCha}>N차 참 -</button>
          </div>

          {chaList.map((cha, idx) => (
            <div key={idx} className="N-cha">
              <div className="cha-info">
                <h3>{idx + 1}차참</h3>
                <div className="cha-sub">
                  <p>{cha.place || "상세장소"}</p>
                  <p>{cha.time || "시간"}</p>
                  <p>{cha.limit || "마감인원"}</p>
                </div>
              </div>
              <div className="attendance-wrap">
                <div className="attendance">
                  {cha.attendees.length ? (
                    cha.attendees.map((n, i) => <p key={`${n}-${i}`}>{n}</p>)
                  ) : (
                    <p>참석자 없음</p>
                  )}
                </div>
                <p>
                  {cha.attendees.length} / {cha.limit || "-"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="calcMain-bottom"></div>
      </section>

      {showAddChaModal && (
        <AddChaModal
          onClose={() => setShowAddChaModal(false)}
          onConfirm={confirmAddCha}
        />
      )}
    </>
  );
}

export default CalcMain;
