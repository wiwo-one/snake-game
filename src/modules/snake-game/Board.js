import React, { useEffect } from "react";
import { AnimatePresence, AnimateSharedLayout, motion, useAnimation } from "framer-motion";

const Board = ({ width, height, star, snakeArray, nextPosition, children }) => {
  const checkIfSnake = ({ x, y }) => {
    let numer;
    snakeArray.forEach((sn, ind) => {
      if (sn.x === x && sn.y === y) numer = ind + 1;
    });
    return numer;
  };

  const Point = ({ x, y }) => {
    const control = useAnimation();

    let layoutId;
    let classString = `w-7 h-7`;
    let xres = 0;
    let yres = 0;
    const num = checkIfSnake({ x, y });
    if (num) {
      classString = `${classString} ${num % 2 ? "bg-green-200" : "bg-green-400"} rounded-md`;
      layoutId = `snake-${num}`;
      if (num > 1) {
        const { x: x2, y: y2 } = snakeArray?.[num - 2];
        const { x: x1, y: y1 } = snakeArray?.[num - 1];
        xres = x2 - x1;
        yres = y2 - y1;
      } else {
        const { x: x1, y: y1 } = snakeArray?.[num - 1];
        xres = nextPosition.x - x1;
        yres = nextPosition.y - y1;
      }
    }

    if (num) {
      return (
        <motion.div
          layoutId={layoutId}
          initial={{ x: 0, y: 0, opacity: 0.8 }}
          animate={{ x: xres * 20, y: yres * 20, opacity: 1 }}
          //animate={control}
          exit={{ x: xres * 20, y: yres * 20, opacity: 0.6 }}
          style={{ display: "inline-block" }}
          className={classString}
          transition={{
            duration: (() => {
              if (y > 0 && y < height - 1 && x > 0 && x < width - 1) return 0.3;
              else return 10;
            })(),
            type: "tween",
          }}>
          {x}
        </motion.div>
      );
    }

    if (star.x === x && star.y === y) classString = `${classString} bg-yellow-400`;

    return <div className={classString} />;
  };

  return (
    // <AnimatePresence>
    <>
      {/* <AnimateSharedLayout> */}
      <motion.div className="relative transition-all" layout>
        {/* ROWS */}
        <div className="border-[1px] flex flex-col w-min border-blue-800">
          {[...Array(height)].map((y, iy) => (
            <div key={iy} className="flex border-0 border-yellow-800 h-7">
              {/* COLS */}
              {[...Array(width)].map((x, ix) => (
                <div key={width * iy + ix} className="border-[1px] border-yellow-800 text-xs transition-all">
                  <Point x={ix} y={iy} />
                </div>
              ))}
            </div>
          ))}
        </div>
        {children}
      </motion.div>
      {/* </AnimateSharedLayout> */}
    </>
    //</AnimatePresence>
  );
};

export default Board;
