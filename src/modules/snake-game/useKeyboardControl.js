import { useEffect, useState } from "react";

const useKeyboardControl = (startDirection = "R") => {
  const [direction, setDirection] = useState(startDirection);

  const checkKey = (e) => {
    if (e.keyCode === "38" || e.code === "ArrowUp") {
      setDirection("U");
    } else if (e.keyCode === "40" || e.code === "ArrowDown") {
      setDirection("D");
    } else if (e.keyCode === "37" || e.code === "ArrowLeft") {
      setDirection("L");
    } else if (e.keyCode === "39" || e.code === "ArrowRight") {
      setDirection("R");
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
