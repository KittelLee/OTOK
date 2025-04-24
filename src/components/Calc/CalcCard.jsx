import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import weekday from "dayjs/plugin/weekday";
import "../../styles/CalcCard.css";

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
function CalcCard({ index, event, onDelete }) {
  const { id, title, place, start, end } = event;

  return (
    <>
      <div className="card-wrap">
        <div className="card-top">
          <div className="card-num">
            <p>{index}</p>
          </div>
          <div className="card-title">
            <h2>{title}</h2>
            <div
              className="close-button"
              onClick={() => onDelete(id)}
              title="삭제"
            >
              ❌
            </div>
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
            <p>N명 참석, N명 상보참</p>
          </div>
        </div>
      </div>
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
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
