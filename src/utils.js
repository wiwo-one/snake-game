import { useEffect, useRef, useState } from "react";

//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback, delay) {
  const savedCallback = useRef();
  const [actualDelay, setActualDelay] = useState(delay);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (actualDelay !== null) {
      let id = setInterval(tick, actualDelay);
      return () => {
        clearInterval(id);
        console.log("CLEANING INTERVAL: " + id);
      };
    }
  }, [actualDelay]);

  return [setActualDelay];
}
