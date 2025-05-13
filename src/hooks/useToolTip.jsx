import { useState, useRef, useCallback } from "react";
import ToolTip from "../components/ToolTip";

export default function useTooltip(timeout = 1800) {
  const [tip, setTip] = useState({ text: "", x: 0, y: 0 });
  const timer = useRef();

  const bind = useCallback(
    (tipText) => ({
      onMouseEnter: (e) => {
        const { clientX, clientY } = e;
        setTip({ text: tipText, x: clientX, y: clientY });
      },
      onMouseLeave: () => setTip({ text: "", x: 0, y: 0 }),

      onTouchStart: (e) => {
        const { clientX, clientY } = e.touches[0];
        setTip({ text: tipText, x: clientX, y: clientY });

        clearTimeout(timer.current);
        timer.current = setTimeout(
          () => setTip({ text: "", x: 0, y: 0 }),
          timeout
        );
      },
    }),
    [timeout]
  );

  const tipNode = <ToolTip text={tip.text} pos={{ x: tip.x, y: tip.y }} />;

  return { tipNode, bind };
}
