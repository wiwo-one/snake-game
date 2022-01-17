import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Board from "../modules/snake-game/Board";

import Game from "../modules/snake-game/Game";
import { ShowDirection } from "../modules/snake-game/ShowDirection";
import useKeyboardControl from "../modules/snake-game/useKeyboardControl";
import MobileControl from "../modules/snake-game/MobileControl";
import { useInterval } from "../utils";
import { useAnimation } from "framer-motion";

const BOARD_WIDTH = 15;
const BOARD_HEIGHT = 15;

export default function SnakeGame() {
  const game = useRef(new Game({ snakeHeadPosition: { x: 2, y: 5 }, width: BOARD_WIDTH, height: BOARD_HEIGHT }));

  const getRefreshedGameState = () => {
    return {
      snakeHeadPosition: game.current.snake.getHeadPosition(),
      points: game.current.points,
      starPosition: game.current.starPosition,
      snakeArray: game.current.snake.getSnakeArray(),
    };
  };

  const [gameState, setGameState] = useState(getRefreshedGameState());
  const [direction, setDirection] = useState("R");

  const handleDirectionChange = (dir) => {
    setDirection(dir);
    game.current.direction = dir;
  };
  useKeyboardControl({ onChangeDirection: handleDirectionChange });
  const handleStopGameClick = () => {
    setGameState({ ...gameState, status: "STOPPED" });
  };

  const handleResetGameClick = () => {
    game.current = new Game({ snakeHeadPosition: { x: 2, y: 5 }, width: BOARD_WIDTH, height: BOARD_HEIGHT });
    setGameState({ ...gameState, status: "RESTARTED" });
  };

  const makeOneMove = () => {
    game.current.makeNextStep();
    setGameState(getRefreshedGameState());
  };

  const [setActualDelay] = useInterval(() => {
    if (gameState.status !== "STOPPED") {
      makeOneMove();
    }
  }, 150);

  return (
    <div className="flex flex-col items-center pt-10 bg-gray-400 h-screen-js">
      <section className="flex justify-around gap-5">
        <button onClick={handleStopGameClick} className="p-2 bg-gray-300 rounded-md">
          STOP ❌
        </button>
        <button onClick={handleResetGameClick} className="p-2 bg-gray-300 rounded-md">
          RESET 🔁
        </button>
        <div className="p-2 bg-gray-300 rounded-md">
          <ShowDirection direction={direction} />
        </div>
        <div className="p-2 bg-gray-300 rounded-md">SCORE: {gameState.points}</div>
      </section>

      <section className="relative mt-5">
        <Board
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
          star={game.current.starPosition}
          snake={gameState.snakeHeadPosition}
          snakeArray={gameState.snakeArray}
          nextPosition={game.current.getNextPosition()}>
          <DrawSnake
            snakeHead={gameState.snakeHeadPosition}
            snakeArray={gameState.snakeArray}
            nextPosition={game.current.getNextPosition()}
          />
        </Board>
      </section>
      <section>
        <MobileControl
          onClickDirection={(dir) => {
            setDirection(dir);
          }}
        />
      </section>
      <section>
        <button onClick={() => setActualDelay(300)} className="p-2 bg-gray-300 rounded-md">
          300 🔥
        </button>
        <button onClick={() => setActualDelay(50)} className="p-2 bg-gray-300 rounded-md">
          50 🔥
        </button>
        <button onClick={() => setActualDelay(1000)} className="p-2 bg-gray-300 rounded-md">
          1000 🔥
        </button>
      </section>
    </div>
  );
}

export function DrawSnake({ snakeHead, snakeArray, nextPosition }) {
  // const [setActualDelay] = useInterval(() => {
  //   makeMove();
  // }, 150);

  const copy = [...snakeArray];

  return (
    <>
      {snakeArray.map((el, ind) => {
        return (
          <DrawElement
            snakeArray={snakeArray[ind]}
            nextPosition={ind === 0 ? nextPosition : { x: snakeArray[ind - 1].x, y: snakeArray[ind - 1].y }}
          />
        );
      })}
    </>
  );
}

// {/* {snakeArray.map((sn, num) => {
//         let xs;
//         let ys;
//         let xres = 0;
//         let yres = 0;
//         if (num > 0) {
//           const { x: x2, y: y2 } = snakeArray?.[num - 1];
//           const { x: x1, y: y1 } = snakeArray?.[num];
//           xres = x2 - x1;
//           yres = y2 - y1;
//           xs = x1;
//           ys = y1;
//         } else {
//           const { x: x1, y: y1 } = snakeArray?.[num];
//           xres = nextPosition.x - x1;
//           yres = nextPosition.y - y1;
//         } */}

export function DrawElement({ snakeArray, nextPosition }) {
  const control = useAnimation();
  const makeMove = () => {
    control.start({
      x: nextPosition.x * 20,
      y: nextPosition.y * 20,
      transition: { duration: 0.15, type: "tween" },
    });
  };

  useEffect(() => {
    makeMove();
    return () => {};
  }, []);

  // const [setActualDelay] = useInterval(() => {
  //   makeMove();
  // }, 150);

  return <motion.div className="absolute z-50 bg-pink-400 border-2 border-blue-600 w-7 h-7" animate={control} />;
}
