import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import dayjs from "dayjs";
import "../../styles/Calc/CalcMain.css";

function CalcMain() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);

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
  }, [eventId]);

  if (loading) return <p style={{ padding: 24 }}>로딩 중…</p>;
  if (!event) return null;

  const fmt = (iso) => dayjs(iso).format("YYYY년 M월 D일 (dd) A h:mm");
  const period = event.end
    ? `${fmt(event.start)} ~ ${fmt(event.end)}`
    : fmt(event.start);

  return (
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
            <a onClick={handleCopyAccount}>계좌번호 복사</a>
          </div>
          <div className="cash-right">
            <div className="total-people">
              <p>총 인원 수</p>
              <p>N 명</p>
            </div>
            <div id="bar" />
            <div className="cash-done">
              <p>입 완: </p>
              <p>입 미완: </p>
            </div>
          </div>
        </div>
        <div className="standBy-people">
          <p>
            상보참 <b id="font-red">N명</b>
          </p>
          <div className="standBy-list">
            <p>키텔</p>
            <p>이언</p>
          </div>
        </div>

        <div id="cha-plus">
          <button>N차 참 +</button>
        </div>
        
        <div className="N-cha">
          <div className="cha-info">
            <h3>1차참</h3>
            <div className="cha-sub">
              <p>상세장소</p>
              <p>시간</p>
              <p>마감인원</p>
            </div>
          </div>
          <div className="attendance-wrap">
            <div className="attendance">
              <p>키텔</p>
            </div>
            <p>1 / 14</p>
          </div>
        </div>

        <div className="N-cha">
          <div className="cha-info">
            <h3>2차참</h3>
            <div className="cha-sub">
              <p>상세장소</p>
              <p>시간</p>
              <p>마감인원</p>
            </div>
          </div>
          <div className="attendance-wrap">
            <div className="attendance">
              <p>키텔</p>
            </div>
            <p>1 / 14</p>
          </div>
        </div>
      </div>

      <div className="calcMain-bottom"></div>
    </section>
  );
}

export default CalcMain;
