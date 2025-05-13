import { useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import "../../styles/Modal/AddChaModal.css";

function AddChaModal({ onClose, onConfirm }) {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");
  const [datetime, setDatetime] = useState("");
  const [limit, setLimit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!place || !link || !datetime || !limit) {
      alert("세 항목을 모두 입력해 주세요.");
      return;
    }

    onConfirm({
      place: place.trim(),
      time: dayjs(datetime).format("YYYY.MM.DD HH:mm"),
      limit: Number(limit),
      link: link.trim(),
      attendees: [],
    });
    onClose();
  };

  return (
    <form className="addChaModal-wrap" onSubmit={handleSubmit}>
      <h2>N차 정보 입력</h2>
      <label>
        장소
        <input
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="예) 건대입구역 근처 와포2호점"
        />
      </label>

      <label>
        장소 링크
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="장소(네이버 지도 or 카카오 지도)링크를 입력하세요"
        />
      </label>

      <label>
        날짜·시간
        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />
      </label>

      <label>
        마감인원
        <input
          type="number"
          min="1"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="숫자입력"
        />
      </label>

      <div className="form-button">
        <button type="submit">저장</button>
      </div>
    </form>
  );
}

export default AddChaModal;

AddChaModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
