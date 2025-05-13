import { createPortal } from "react-dom";
import PropTypes from "prop-types";

export default function Tooltip({ text, pos }) {
  if (!text) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        transform: "translate(-50%, -100%)",
        background: "var(--gray-700)",
        color: "#fff",
        padding: "4px 8px",
        fontSize: "0.8rem",
        borderRadius: "var(--radius-sm)",
        whiteSpace: "nowrap",
        zIndex: 3000,
        pointerEvents: "none",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {text}
    </div>,
    document.body
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  pos: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};
