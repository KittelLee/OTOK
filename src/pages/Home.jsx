import { useEffect } from "react";
import { Link } from "react-router-dom";
import town from "../assets/imgs/town.png";
import kakaoLogo from "../assets/icons/kakaotalk.svg";
import somoimLogo from "../assets/imgs/somoim.webp";
import "../styles/Home.css";

function Home() {
  useEffect(() => {
    const bubbles = document.querySelectorAll(".bubble-left, .bubble-right");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("hidden");
          } else {
            entry.target.classList.add("hidden");
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    bubbles.forEach((bubble) => observer.observe(bubble));

    return () => {
      bubbles.forEach((bubble) => observer.unobserve(bubble));
    };
  }, []);
  return (
    <>
      <section className="section-first">
        <div className="text-box">
          <strong>
            💛서울경기2030💛친목연애💛
            <br />
            잠실, 수원, 분당, 인천등
            <br />
            수도권에서 만나요!
          </strong>
          <p>
            지금 바로 카카오톡 오픈채팅방에 동네에서 놀던가를 검색하고
            소통해보세요.
          </p>
        </div>
        <div className="kakao-btn-box">
          <Link to="./room" className="kakao-btn">
            <img src={kakaoLogo} alt="카카오톡로고" />
            카카오톡으로 이동하기
          </Link>
        </div>
        <div className="town">
          <img src={town} alt="동네이미지" />
        </div>
      </section>

      <section className="section-second">
        <div className="title-text">
          <h1>🎉환영합니다🎉</h1>
          <h2>순서대로 해볼까요!</h2>
          <div className="bubble-wrap">
            <div className="bubble-left">
              <p>
                1번, 방 하트
                <br />
                <br />
                우측 상단 짝대기 3개 클릭!
                <br />
                상단 하트 ♥️
              </p>
            </div>
            <div className="bubble-right">
              <p>
                2번, 닉변
                <br />
                <br />
                ex&#41; 아무개 97 분당 여 0102
                <br />
                &#40;우측상단 짝대기 3개 &gt; 본인선택 &gt; 프로필편집 &#41;
              </p>
            </div>
            <div className="bubble-left">
              <p>
                3번, 얼공
                <br />
                <br />
                입장 후 얼공 필수!! 😉
                <br />
                &#40; 눈,코,입 나온걸로 전신불가🚫 &#41;
                <br />
                얼공한장하고 이성지목 1명가능! 😏
                <br />
                지목당한사람도 얼공!! 😮
                <br />
                (방장,부방 확인 후 가리기 적용, 자삭금지!)
              </p>
            </div>
            <div className="bubble-right">
              <p>
                4번, 자기소개
                <br />
                <br />
                빨리친해질수있게 간단하게 자기소개부탁해!
                <br />
                <br />
                <p id="align-left">
                  닉네임 :<br />
                  유입경로(검색어) :<br />
                  거주 :<br />
                  직업 :<br />
                  이상형 : <br />
                  MBTI :<br />
                  주량 :<br />
                  흡연 :<br />
                  취미 :<br />
                  첫벙 예정일:
                </p>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-third">
        <div className="third-text-box">
          <h1>우리 같이 소모임도 가입해 볼까요?</h1>
          <p>지금 바로 링크를 눌러 가입을 해보세요.!</p>
        </div>
        <Link
          to="https://www.somoim.co.kr/4a076d68-ee6c-11ef-8fba-0a4e841b4fad1"
          className="somoim-btn"
        >
          <img src={somoimLogo} alt="소모임로고" />
          소모임으로 이동
        </Link>
      </section>
    </>
  );
}

export default Home;
