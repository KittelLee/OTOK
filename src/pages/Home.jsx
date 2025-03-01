import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import ProfileCircle from "../common/ProfileCircle";
import town from "../assets/imgs/town.png";
import Pillow from "../assets/imgs/Pillow.png";
import Chacha from "../assets/imgs/Chacha.png";
import Iron from "../assets/imgs/Iron.png";
import Mocha from "../assets/imgs/Mocha.png";
import kakaoLogo from "../assets/icons/kakaotalk.svg";
import "../styles/Home.css";

function Home() {
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
          <Link to="https://open.kakao.com/o/g1BY1fAg" className="kakao-btn">
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
          <h2>대표 운영진</h2>
        </div>
        <Marquee speed={100}>
          <div className="slideshow">
            <ProfileCircle src={Pillow} name="방장 조현준(베개)" />
            <ProfileCircle src={Chacha} name="1방 부방장 정초희(차차)" />
            <ProfileCircle src={Iron} name="2방 부방장 정가현(이언)" />
            <ProfileCircle src={Mocha} name="3방 부방장 이정은(모카)" />
          </div>
        </Marquee>
      </section>
    </>
  );
}

export default Home;
