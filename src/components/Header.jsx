import { useState } from "react";
import { Link } from "react-router-dom";
import bars from "../assets/icons/bars.svg";
import "../styles/Header.css";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <div className="header-wrap">
        <div className="logo-box">
          <Link to="/" className="logo">
            <p>💛서울경기2030💛친목연애💛잠실수원분당인천</p>
          </Link>
        </div>
        <nav className={`navbar ${isNavOpen ? "active" : ""}`}>
          <ul className="nav">
            <li>
              <Link to="#">모임회칙</Link>
            </li>
            <li>
              <Link to="#">정산하기</Link>
            </li>
            <li>
              <Link to="#">갤러리</Link>
            </li>
            <li>
              <Link to="#">정모방</Link>
            </li>
            <li>
              <Link to="#">회원가입</Link>
            </li>
            <li>
              <Link to="#">로그인</Link>
            </li>
          </ul>
        </nav>
        <button className="toggle-btn" onClick={toggleNav}>
          <img src={bars} alt="메뉴바" />
        </button>
      </div>
    </header>
  );
}

export default Header;
