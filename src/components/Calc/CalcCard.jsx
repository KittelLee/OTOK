import "../../styles/CalcCard.css";

function CalcCard() {
  return (
    <>
      <div className="card-wrap">
        <div className="card-top">
          <div className="card-num">
            <p>1</p>
          </div>
          <div className="card-title">
            <h2>잠실벙</h2>
          </div>
        </div>
        <div className="card-middle">
          <div className="card-date">
            <p>
              2025년 3월 7일 (금) 오후 7:00 ~ <br />
              2025년 3월 8일 (토) 오후 11:00
            </p>
          </div>
          <div className="card-place">
            <p>잠실</p>
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
