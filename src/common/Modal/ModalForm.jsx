import Modal from "react-modal";
import PropTypes from "prop-types";
import "../../styles/ModalForm.css";

Modal.setAppElement("#root");

ModalForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

function ModalForm({ isOpen, onClose, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldFocusAfterRender={true}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          minWidth: "260px",
          color: "black",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        },
      }}
    >
      {children}
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
}

export default ModalForm;
