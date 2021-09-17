import React from "react";

const Board = ({ width, height, star, snake, snakeArray }) => {
  const checkIfSnake = ({ x, y }) => {
    return snakeArray.filter((sn) => sn.x === x && sn.y === y).length > 0;
  };

  return (
    <div>
      {/* ROWS */}
      <div className="border-[1px] flex flex-col w-min border-blue-800">
        {[...Array(height)].map((y, iy) => (
          <div key={iy} className="flex h-6 border-0 border-yellow-800">
            {/* COLS */}
            {[...Array(width)].map((x, ix) => (
              <div
                key={width * iy + ix}
                className={`w-6 h-6 border-[1px] border-yellow-800 text-xs 
                ${snake.x === ix && snake.y === iy ? "bg-green-500 rounded-md" : ""}
                ${checkIfSnake({ x: ix, y: iy }) ? "bg-green-200 rounded-md" : ""} 
                ${star.x === ix && star.y === iy ? "bg-yellow-400" : ""} 
                    }`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
