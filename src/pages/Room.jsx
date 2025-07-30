import room1 from "../assets/imgs/room1.jpeg";
import room2 from "../assets/imgs/room2.jpeg";
import room3 from "../assets/imgs/room3.png";
import room4 from "../assets/imgs/room4.jpeg";
import room5 from "../assets/imgs/room5.png";
import "../styles/Room.css";

function Room() {
  return (
    <>
      <section className="room-wrap">
        <p>원하는 방 이미지 혹은 텍스트 클릭 후 이동</p>
        <div className="room-top">
          <div className="room-info">
            <a href="https://open.kakao.com/o/g1BY1fAg">
              <img src={room1} />
              <p>1방 링크</p>
            </a>
          </div>

          <div className="room-info">
            <a href="https://open.kakao.com/o/goDfH7bh">
              <img src={room2} />
              <p>2방 링크</p>
            </a>
          </div>
        </div>

        <div className="room-middle">
          <div className="room-info">
            <a href="https://open.kakao.com/o/gBY9BKhh">
              <img src={room3} />
              <p>3방 링크</p>
            </a>
          </div>

          <div className="room-info">
            <a href="https://open.kakao.com/o/gfDDjKxh">
              <img src={room4} />
              <p>4방 링크</p>
            </a>
          </div>
        </div>

        <div className="room-bottom">
          <div className="room-info">
            <a href="https://open.kakao.com/o/gWCE7KJh">
              <img src={room5} />
              <p>5방 링크</p>
            </a>
          </div>

          <div className="room-info">
            <a href="#">
              <img src="#" />
              <p>6방 링크</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Room;
