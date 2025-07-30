import OutCard from "../components/Out/OutCard";
import "../styles/Out.css";

function Out() {
  return (
    <>
      <section className="out-wrap">
        <div className="out-top">
          <button>외출 신청하기</button>
          <button>외출 목록보기</button>
          {/* 외출 목록은 관리자계정만 조회가능하게 */}
        </div>

        <div className="out-list">
          <OutCard />
        </div>
      </section>
    </>
  );
}

export default Out;
