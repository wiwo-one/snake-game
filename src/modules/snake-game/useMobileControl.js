import React, { useEffect, useState } from "react";

const useMobileControl = (startDirection = "R") => {
  const [direction, setDirection] = useState(startDirection);

  return [
    direction,
    <div className="w-[200px] h-[200px] flex flex-col gap-2 items-center justify-center bg-gray-500">
      <div>
        <button onClick={() => setDirection("U")} className="p-2 w-14 h-14 bg-gray-300 rounded-md">
          U
        </button>
      </div>
      <div className="flex gap-16">
        <button onClick={() => setDirection("L")} className="p-2 w-14 h-14 bg-gray-300 rounded-md">
          L
        </button>
        <button onClick={() => setDirection("R")} className="p-2 w-14 h-14 bg-gray-300 rounded-md">
          R
        </button>
      </div>
      <div>
        <button onClick={() => setDirection("D")} className="p-2 w-14 h-14 bg-gray-300 rounded-md">
          D
        </button>
      </div>
    </div>,
  ];
};

export default useMobileControl;
