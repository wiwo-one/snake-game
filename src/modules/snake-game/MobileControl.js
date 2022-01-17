import React, { useEffect, useState } from "react";

const MobileControl = ({ startDirection = "R", onClickDirection }) => {
  return [
    <div className="w-[200px] h-[200px] flex flex-col gap-2 items-center justify-center bg-gray-500">
      <div>
        <button onClick={() => onClickDirection("U")} className="p-2 bg-gray-300 rounded-md w-14 h-14">
          U
        </button>
      </div>
      <div className="flex gap-16">
        <button onClick={() => onClickDirection("L")} className="p-2 bg-gray-300 rounded-md w-14 h-14">
          L
        </button>
        <button onClick={() => onClickDirection("R")} className="p-2 bg-gray-300 rounded-md w-14 h-14">
          R
        </button>
      </div>
      <div>
        <button onClick={() => onClickDirection("D")} className="p-2 bg-gray-300 rounded-md w-14 h-14">
          D
        </button>
      </div>
    </div>,
  ];
};

export default MobileControl;
