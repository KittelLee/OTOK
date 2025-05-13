import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import "../../styles/Modal/CalcAddModal.css";

function CalcAddModal({ onSubmit }) {
  const now = dayjs().format("YYYY-MM-DDTHH:mm");

  const [title, setTitle] = useState("");
  const [fee, setFee] = useState("없음");
  const [host, setHost] = useState("");
  const [bank, setBank] = useState("카카오페이");
  const [account, setAccount] = useState("");
  const [start, setStart] = useState(now);
  const [end, setEnd] = useState("");
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  // ① bank가 카카오페이일 때 account 입력창 초기화
  useEffect(() => {
    if (bank === "카카오페이") setAccount("");
  }, [bank]);

  // ② 자주 쓰이니 편하게 변수로
  const isKakaoPay = bank === "카카오페이";

  // 제출폼
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title ||
      !host ||
      (!isKakaoPay && !account) ||
      !start ||
      !end ||
      !place ||
      !link
    ) {
      toast.error("모든 입력란을 빠짐없이 작성해주세요!");
      return;
    }

    if (!/https?:\/\//i.test(link)) {
      toast.error(
        "정산방 카톡링크는 http:// 또는 https:// 로 시작해야 합니다."
      );
      return;
    }

    onSubmit({
      title,
      fee,
      host,
      bank,
      account,
      start,
      end,
      place,
      link,
    });

    toast.success("벙이 성공적으로 생성되었습니다!");
  };

  return (
    <form className="calcAddModal-wrap" onSubmit={handleSubmit}>
      <h2>벙 개최하기</h2>
      <div className="form-field">
        <label>제목 입력</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="벙 제목을 입력하세요"
          required
        />
      </div>

      <div className="form-field">
        <label>선입금비용</label>
        <select value={fee} onChange={(e) => setFee(e.target.value)}>
          <option>없음</option>
          {[
            10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
            100000,
          ].map((v) => (
            <option key={v}>{v.toLocaleString()}원</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label>벙주 입력</label>
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="벙주를 입력하세요"
          required
        />
      </div>

      <div className="form-field">
        <label>벙주 계좌입력</label>
        <select value={bank} onChange={(e) => setBank(e.target.value)}>
          {[
            "국민은행",
            "신한은행",
            "농협은행",
            "기업은행",
            "우리은행",
            "하나은행",
            "산업은행",
            "씨티은행",
            "케이뱅크",
            "토스뱅크",
            "카카오뱅크",
            "카카오페이",
          ].map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder={
            isKakaoPay ? "카카오페이는 계좌가 필요 없어요" : "계좌입력"
          }
          disabled={isKakaoPay}
        />
      </div>

      <div className="form-field">
        <label>벙 시작 시간</label>
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label>벙 종료 시간</label>
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label>벙 장소</label>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="벙 장소를 입력하세요"
        />
      </div>

      <div className="form-field">
        <label>정산방 카톡링크</label>
        <input
          type="url"
          pattern="https?://.*"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="http(s):// 로 시작하는 정산방 링크를 여기에 입력"
          required
        />
      </div>

      <div className="form-button">
        <button>벙 만들기</button>
      </div>
    </form>
  );
}

export default CalcAddModal;

CalcAddModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
