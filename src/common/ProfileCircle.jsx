import PropTypes from "prop-types";
import "../styles/ProfileCircle.css";

function ProfileCircle({ src, name }) {
  return (
    <div className="profile-circle">
      <img src={src} />
      <p>{name}</p>
    </div>
  );
}

ProfileCircle.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ProfileCircle;
