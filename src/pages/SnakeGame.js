import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Board from "../modules/snake-game/Board";

import Game from "../modules/snake-game/Game";
import { ShowDirection } from "../modules/snake-game/ShowDirection";
import useKeyboardControl from "../modules/snake-game/useKeyboardControl";
import useMobileControl from "../modules/snake-game/useMobileControl";
import { useInterval } from "../utils";

const BOARD_WIDTH = 15;
const BOARD_HEIGHT = 15;

export default function SnakeGame() {
  const game = useRef(new Game({ snakeHeadPosition: { x: 2, y: 5 }, width: 15, height: 15 }));

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
  const [keyboardDirection] = useKeyboardControl();
  const [mobileDirection, mobileControl] = useMobileControl();

  useEffect(() => {
    game.current.direction = keyboardDirection;
    setDirection(keyboardDirection);
  }, [keyboardDirection]);

  useEffect(() => {
    game.current.direction = mobileDirection;
    setDirection(mobileDirection);
  }, [mobileDirection]);

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
  }, 300);

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
            snake={gameState.snakeHeadPosition}
            snakeArray={gameState.snakeArray}
            nextPosition={game.current.getNextPosition()}
          />
        </Board>
      </section>
      <section>{mobileControl}</section>
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

export function DrawSnake({ snake, snakeArray, nextPosition }) {
  return (
    <div className="absolute">
      {snakeArray.map((sn, num) => {
        let xs;
        let ys;
        let xres = 0;
        let yres = 0;
        if (num > 0) {
          const { x: x2, y: y2 } = snakeArray?.[num - 1];
          const { x: x1, y: y1 } = snakeArray?.[num];
          xres = x2 - x1;
          yres = y2 - y1;
          xs = x1;
          ys = y1;
        } else {
          const { x: x1, y: y1 } = snakeArray?.[num];
          xres = nextPosition.x - x1;
          yres = nextPosition.y - y1;
        }

        return (
          <motion.div
            style={{ left: xres * 20, top: yres * 20 }}
            className="absolute z-50 w-5 h-5 bg-pink-400 border-2 border-blue-600"
            initial={{ x: xs * 20, y: ys * 20 }}
            animate={{ x: (xs + xres) * 20, y: (ys + yres) * 20 }}
            transition={{ duration: 0.3, type: "tween" }}
          />
        );
      })}
    </div>
  );
}
