import dayjs from "dayjs";
import "dayjs/locale/ko";
import weekday from "dayjs/plugin/weekday";
import "../../styles/Out/OutCard.css";

dayjs.extend(weekday);
dayjs.locale("ko");

function formatKoreanDateTime(startISO, endISO) {
  const s = dayjs(startISO);
  const e = dayjs(endISO);
  const fmt = (d) =>
    `${d.year()}년 ${d.month() + 1}월 ${d.date()}일 (${
      ["일", "월", "화", "수", "목", "금", "토"][d.day()]
    }) ` + d.format("A h:mm");
  return endISO ? `${fmt(s)} ~\n${fmt(e)}` : fmt(s);
}

function OutCard() {
  return (
    <>
      <section className="outCard-wrap">
        <div className="outCard-top">
          <div className="outCard-num">
            <p>1</p>
          </div>
          <div className="outCard-title">
            <h2>이언 외출신청</h2>
            <div className="close-button">❌</div>
          </div>
        </div>

        <div className="outCard-bottom">
          <div className="outCard-date">
            <p className="date-text">2025년 7월 14일</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default OutCard;
