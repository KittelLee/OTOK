import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import PropTypes from "prop-types";
import bars from "../assets/icons/bars.svg";
import "../styles/Header.css";

function Header({ user }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      auth.signOut();
    }
  };

  const handleLinkClick = () => {
    setIsNavOpen(false);
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
              <Link to="/rule" onClick={handleLinkClick}>
                모임회칙
              </Link>
            </li>
            <li>
              <Link to="/room" onClick={handleLinkClick}>
                방이동
              </Link>
            </li>
            <li>
              <Link to="/calc" onClick={handleLinkClick}>
                정산하기
              </Link>
            </li>
            <li>
              <Link to="/out" onClick={handleLinkClick}>
                외출신청
              </Link>
            </li>
            <li>
              <Link to="/lotteryPrediction" onClick={handleLinkClick}>
                복권예측
              </Link>
            </li>
            {user ? (
              <li>
                <span className="user-display" onClick={handleLogout}>
                  {user.displayName || user.email}
                </span>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/signUp" onClick={handleLinkClick}>
                    회원가입
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={handleLinkClick}>
                    로그인
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <button className="toggle-btn" onClick={toggleNav}>
          <img src={bars} alt="메뉴바" />
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default Header;
