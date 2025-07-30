import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import weekday from "dayjs/plugin/weekday";
import "../../styles/Calc/CalcCard.css";

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

function CalcCard({ index, event, onDelete, user }) {
  const { id, title, place, start, end, createdBy } = event;

  /* ✅ 참석·상보참 인원 계산 */
  const paid = Array.isArray(event.paid) ? event.paid : [];
  const pending = Array.isArray(event.pending) ? event.pending : [];
  const standBy = Array.isArray(event.standBy) ? event.standBy : [];

  const attendCount = new Set([...paid, ...pending]).size; // 중복 제거
  const standByCount = standBy.length;

  const isOwner = user && user.uid === createdBy;

  return (
    <>
      <section className="card-wrap">
        <div className="card-top">
          <div className="card-num">
            <p>{index}</p>
          </div>
          <div className="card-title">
            <h2>{title}</h2>
            {/* 만든 사람에게만 삭제 버튼 노출 */}
            {isOwner && (
              <div
                className="close-button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(id);
                }}
                title="삭제"
              >
                ❌
              </div>
            )}
          </div>
        </div>

        <div className="card-middle">
          <div className="card-date">
            <p className="date-text">{formatKoreanDateTime(start, end)}</p>
          </div>
          <div className="card-place">
            <p>{place}</p>
          </div>
        </div>

        <div className="card-bottom">
          <div className="card-person">
            <p>
              {attendCount}명 참석, {standByCount}명 상보참
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default CalcCard;

CalcCard.propTypes = {
  index: PropTypes.number.isRequired,
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    place: PropTypes.string,
    start: PropTypes.string.isRequired,
    end: PropTypes.string,
    createdBy: PropTypes.string,
    paid: PropTypes.array,
    pending: PropTypes.array,
    standBy: PropTypes.array,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
};
