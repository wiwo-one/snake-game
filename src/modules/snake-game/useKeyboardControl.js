import { useEffect, useState } from "react";

const useKeyboardControl = ({ startDirection = "R", onChangeDirection }) => {
  const onChange = (dir) => {
    setDirection(dir);
    onChangeDirection(dir);
  };
  const [direction, setDirection] = useState(startDirection);

  const checkKey = (e) => {
    if (e.keyCode === "38" || e.code === "ArrowUp") {
      onChange("U");
    } else if (e.keyCode === "40" || e.code === "ArrowDown") {
      onChange("D");
    } else if (e.keyCode === "37" || e.code === "ArrowLeft") {
      onChange("L");
    } else if (e.keyCode === "39" || e.code === "ArrowRight") {
      onChange("R");
    } else if (e.keyCode === "32" || e.code === " " || e.code === "Spacebar") {
      console.log("SPACJA");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", checkKey);
  }, []);

  return [direction];
};

export default useKeyboardControl;
