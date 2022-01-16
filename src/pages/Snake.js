import React, { useEffect, useRef, useState } from "react";
import Board from "../modules/snake-game/Board";

import Game from "../modules/snake-game/Game";
import { ShowDirection } from "../modules/snake-game/ShowDirection";
import useKeyboardControl from "../modules/snake-game/useKeyboardControl";
import useMobileControl from "../modules/snake-game/useMobileControl";
import { useInterval } from "../utils";

const Snake2 = () => {
  const game = useRef(new Game({ snakeHeadPosition: { x: 2, y: 5 }, width: 15, height: 15 }));

  const getRefreshedGameState = () => {
    return {
      snakeHeadPosition: game.current.snakeHeadPosition,
      points: game.current.points,
      starPosition: game.current.starPosition,
      snakeArray: game.current.getSnakeArray(),
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

  const handleMoveClick = () => {
    game.current.makeNextStep();
    setGameState(getRefreshedGameState());
  };

  const handleStopGameClick = () => {
    setGameState({ ...gameState, status: "STOPPED" });
  };

  const handleResetGameClick = () => {
    game.current = new Game({ snakeHeadPosition: { x: 2, y: 5 }, width: 15, height: 15 });
    setGameState({ ...gameState, status: "RESTARTED" });
  };

  const [setActualDelay] = useInterval(() => {
    if (gameState.status !== "STOPPED") {
      handleMoveClick();
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

      <section className="mt-5">
        <Board
          width={game.current.boardWidth}
          height={game.current.boardHeight}
          star={game.current.starPosition}
          snake={gameState.snakeHeadPosition}
          snakeArray={gameState.snakeArray}
        />
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
};

export default Snake2;
