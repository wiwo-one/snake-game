import React from "react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

const Board = ({ width, height, star, snake, snakeArray, nextPosition, children }) => {
  const checkIfSnake = ({ x, y }) => {
    if (snakeArray.filter((sn) => sn.x === x && sn.y === y).length > 0) {
      let numer;
      snakeArray.forEach((sn, ind) => {
        if (sn.x === x && sn.y === y) {
          numer = ind + 1;
        }
      });
      return numer;
    }
  };

  const Point = ({ x, y }) => {
    let layoutId;
    let classString = `w-7 h-7`;
    // if (snake.x === x && snake.y === y) {
    //   classString = `${classString} bg-pink-500 rounded-md`;
    //   layoutId = `snake-head`;
    // }
    const num = checkIfSnake({ x, y });

    if (num) {
      console.log("NUM " + num);
      classString = `${classString} ${num % 2 ? "bg-green-200" : "bg-green-400"} rounded-md`;
      layoutId = `snake-${num}`;
      let xres = 0;
      let yres = 0;
      if (num > 1) {
        const { x: x2, y: y2 } = snakeArray?.[num - 2];
        const { x: x1, y: y1 } = snakeArray?.[num - 1];
        xres = x2 - x1;
        yres = y2 - y1;
        console.log(`xres: ${xres} | yres ${yres}`);
      } else {
        const { x: x1, y: y1 } = snakeArray?.[num - 1];
        xres = nextPosition.x - x1;
        yres = nextPosition.y - y1;
        console.log(xres);
        //const {x: x2, y: y2} = next
      }

      return (
        <motion.div
          layoutId={layoutId}
          initial={{ x: 0, y: 0, opacity: 0.8 }}
          animate={{ x: xres * 20, y: yres * 20, opacity: 1 }}
          exit={{ x: xres * 20, y: yres * 20, opacity: 0.6 }}
          style={{ display: "inline-block" }}
          className={classString}
          transition={{ duration: 0.3, type: "tween" }}
        />
      );
    }
    if (star.x === x && star.y === y) {
      classString = `${classString} bg-yellow-400`;
      layoutId = `star`;
    }
    return (
      <div
        //layoutId={layoutId}
        //initial={{}}
        //animate={{}}
        style={{ display: "inline-block" }}
        className={classString}
        //transition={{ duration: 0.25, type: "tween" }}
      />
    );
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
