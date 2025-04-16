import "../../styles/Modal/CalcAddModal.css";

function CalcAddModal() {
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
            <input type="datetime-local" />
          </div>

          <div className="form-field">
            <label>벙 종료 시간</label>
            <input type="datetime-local" />
          </div>

          <div className="form-field">
            <label>벙 장소</label>
            <input type="text" placeholder="벙 장소를 입력하세요" />
          </div>
        </form>
      </section>
    </>
  );
}

export default CalcAddModal;
