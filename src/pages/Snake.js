import React, { useEffect, useRef, useState } from "react";
import Board from "../modules/snake-game/Board";

import Game from "../modules/snake-game/game";
import { ShowDirection } from "../modules/snake-game/ShowDirection";
import useKeyboardControl from "../modules/snake-game/useKeyboardControl";
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

  const [direction] = useKeyboardControl();

  useEffect(() => {
    game.current.direction = direction;
  }, [direction]);

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

  useInterval(() => {
    if (gameState.status !== "STOPPED") {
      handleMoveClick();
    }
  }, 300);

  return (
    <div className="flex flex-col items-center pt-16 h-screen-js bg-gray-400">
      <section className="flex gap-5 justify-around">
        <button onClick={handleMoveClick} className="p-2 bg-gray-300 rounded-md">
          MOVE 🐍
        </button>
        <button onClick={game.current.printGameInfo} className="p-2 bg-gray-300 rounded-md">
          PRINT INFO 🐍
        </button>
        <button onClick={handleStopGameClick} className="p-2 bg-gray-300 rounded-md">
          STOP ❌
        </button>
        <button onClick={handleResetGameClick} className="p-2 bg-gray-300 rounded-md">
          RESET 🔁
        </button>
      </section>
      <section className="mt-5">
        <h1 className="text-gray-800">
          Direction: <ShowDirection direction={direction} /> <div className="inline-block w-10"></div> Points:{" "}
          {gameState.points}
        </h1>
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
    </div>
  );
};

export default Snake2;
