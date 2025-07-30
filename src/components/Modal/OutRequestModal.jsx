import "../../styles/Modal/OutRequestModal.css";

function OutRequestModal() {
  return (
    <>
      <section className="outRequest-wrap">
        <div className="outRequest">
          <h1>외출 신청하기</h1>
          <form className="outForm">
            <label>
              닉네임
              <input type="text" placeholder="닉네임을 입력하세요" />
            </label>

            <label>
              외출기한
              <input type="datetime-local" />
              부터
              <input type="datetime-local" />
              까지
            </label>

            <label>
              외출사유
              <textarea placeholder="외출사유를 자세히 적어주세요"></textarea>
            </label>

            <div className="form-button">
              <button type="submit">완료 및 제출</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default OutRequestModal;
