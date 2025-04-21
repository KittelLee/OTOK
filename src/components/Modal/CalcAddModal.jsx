import { useMemo } from "react";
import "../../styles/Modal/CalcAddModal.css";

function CalcAddModal() {
  //현재시간
  const formattedNow = useMemo(() => {
    const now = new Date();
    const Year = now.getFullYear();
    const Month = String(now.getMonth() + 1).padStart(2, "0");
    const Day = String(now.getDate()).padStart(2, "0");
    const Hour = String(now.getHours()).padStart(2, "0");
    const Minute = String(now.getMinutes()).padStart(2, "0");

    return `${Year}-${Month}-${Day}T${Hour}:${Minute}`;
  }, []);

  return (
    <>
      <section className="calcAddModal-wrap">
        <h2>벙 개최하기</h2>
        <form>
          <div className="form-field">
            <label>제목 입력</label>
            <input type="text" placeholder="벙 제목을 입력하세요" required />
          </div>

          <div className="form-field">
            <label>벙주 입력</label>
            <input type="text" placeholder="벙주를 입력하세요" required />
          </div>

          <div className="form-field">
            <label>벙주 계좌입력</label>
            <select>
              <option>국민은행</option>
              <option>신한은행</option>
              <option>농협은행</option>
              <option>기업은행</option>
              <option>우리은행</option>
              <option>하나은행</option>
              <option>산업은행</option>
              <option>씨티은행</option>
              <option>케이뱅크</option>
              <option>토스뱅크</option>
              <option>카카오뱅크</option>
              <option>카카오페이</option>
            </select>
            <input type="text" placeholder="계좌입력" />
          </div>

          <div className="form-field">
            <label>벙 시작 시간</label>
            <input type="datetime-local" defaultValue={formattedNow} required />
          </div>

          <div className="form-field">
            <label>벙 종료 시간</label>
            <input type="datetime-local" />
          </div>

          <div className="form-field">
            <label>벙 장소</label>
            <input type="text" placeholder="벙 장소를 입력하세요" />
          </div>
          <div className="form-button">
            <button>벙 만들기</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CalcAddModal;
