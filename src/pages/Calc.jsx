import UploadIcon from "../assets/icons/upload.svg";
import "../styles/Calc.css";

function Calc() {
  return (
    <>
      <section className="calc-wrap">
        <div className="calc-top">
          <input type="text" placeholder="벙 이름으로 검색" />
          <button>
            <img src={UploadIcon} />
          </button>
        </div>
        <div>
          <p>1. (벙주체크) 인원 및 사람체크</p>
          <p>2. 정시참 늦참 일찍참 체크</p>
          <p>3. n빵 계산기</p>
          <p>4. 입금완료자 / 입금미완료자</p>
          <p>5. 선입금 및 계좌</p>
          <p>6. 영수증+계산서</p>
          <p>7. 벙위치</p>
        </div>
      </section>
    </>
  );
}

export default Calc;
