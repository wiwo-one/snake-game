import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "../utils";

const BOARD_WIDTH = 15;
const BOARD_HEIGHT = 15;

const Snake = () => {
  const board = useRef([]);

  //const restartCounter = useRef(0);
  const [restartCounter, setRestartCounter] = useState(0);

  //set up main array of arrays to store all fields
  useEffect(() => {
    const boardArr = [];
    for (let row = 0; row < BOARD_HEIGHT; row++) {
      const rowArr = [];
      for (let col = 0; col < BOARD_WIDTH; col++) {
        rowArr.push({ x: col, y: row, snake: false, star: false });
      }
      boardArr.push(rowArr);
    }
    board.current = boardArr;

    changeColor({
      x: Math.floor(Math.random() * BOARD_WIDTH),
      y: Math.floor(Math.random() * BOARD_HEIGHT),
      action: "setStar",
    });
  }, [restartCounter]);

  const position = useRef({ x: 3, y: 4 });
  const snake = useRef([{ x: 3, y: 4 }]);
  const [direction, setDirection] = useState("R");
  const [points, setPoints] = useState(0);
  const pointsRef = useRef(0);
  const [gameStatus, setGameStatus] = useState({ isOn: true, info: "", gameOver: false });

  const moveSnake = ({ x, y }) => {
    //przewidz co sie stanie
    if (typeof board?.current[y] === "undefined" || typeof board?.current[y][x] === "undefined") {
      console.log("❌ GAME OVER 😔");
      setGameStatus({ isOn: false, info: "You went out of the board", gameOver: true });
      return;
    } else if (board.current[y][x]?.star) {
      //gwiazda zlapana
      console.log("yeah ⭐");
      pointsRef.current = pointsRef.current + 1;
      handleStarConsumption({ x: x, y: y });
      snake.current.push({ x, y });
      position.current = { x, y };
      changeColor({ x, y, action: "setSnake" });
    } else if (
      !(() => {
        //czy nie zjada samego siebie
        let wynik = true;
        snake.current.forEach((el, ind) => {
          if (el.x === x && el.y === y) {
            console.log("przegrana na x: " + x + " y:" + y);
            console.log("przegrana na el.x: " + el.x + " el.y:" + el.y);
            wynik = false;
            return false;
          }
        });
        return wynik;
      })()
    ) {
      console.log("YOUE EAT YOURSELF, GAME OVER");
      setGameStatus({ isOn: false, info: "You bite yourself", gameOver: true });
    } else {
      //gra dalej
      snake.current.push({ x, y });
      changeColor({ x: snake.current[0].x, y: snake.current[0].y, action: "clearSnake" });
      snake.current = snake.current.splice(1);
      position.current = { x, y };
      changeColor({ x, y, action: "setSnake" });
    }
  };

  const makeNextStep = () => {
    let { x, y } = position.current;
    if (direction === "L") x = x - 1;
    if (direction === "R") x = x + 1;
    if (direction === "D") y = y + 1;
    if (direction === "U") y = y - 1;
    moveSnake({ x: x, y: y });
  };

  /**
   * @param  {} {x
   * @param  {} y
   * @param  {} action="null"}
   */
  const changeColor = ({ x, y, action = "null" }) => {
    const newBoard = board.current.splice(0);
    if (action === "toggleSnake") newBoard[y][x].snake = !newBoard[y][x].snake;
    if (action === "toggleStar") newBoard[y][x].star = !newBoard[y][x].star;
    if (action === "setSnake") newBoard[y][x].snake = true;
    if (action === "setStar") newBoard[y][x].star = true;
    if (action === "clearSnake") newBoard[y][x].snake = false;
    if (action === "clearStar") newBoard[y][x].star = false;
    board.current = newBoard.splice(0);
    setCounter(counter + 1);
  };

  const checkKey = (e) => {
    if (e.keyCode === "38" || e.code === "ArrowUp") {
      setDirection("U");
    } else if (e.keyCode === "40" || e.code === "ArrowDown") {
      setDirection("D");
    } else if (e.keyCode === "37" || e.code === "ArrowLeft") {
      setDirection("L");
    } else if (e.keyCode === "39" || e.code === "ArrowRight") {
      setDirection("R");
    } else if (e.keyCode === "32" || e.code === " " || e.code === "Spacebar") {
      console.log("SPACJA");
    }
  };

  const handleStarConsumption = ({ x, y }) => {
    changeColor({ x, y, action: "clearStar" });
    setPoints(points + 1);
    changeColor({
      x: Math.floor(Math.random() * BOARD_WIDTH),
      y: Math.floor(Math.random() * BOARD_HEIGHT),
      action: "setStar",
    });
  };

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(counter + 1);
  }, [board.current]);

  useEffect(() => {}, [counter]);

  useEffect(() => {
    setPoints(pointsRef.current);
  }, [pointsRef.current]);

  useEffect(() => {
    document.addEventListener("keydown", checkKey);
    changeColor({ x: 3, y: 4, action: "setSnake" });
    return () => {};
  }, []);

  useInterval(() => {
    if (gameStatus.isOn) {
      console.log("useinterval 🤑");

      makeNextStep();
    }
  }, 1000);

  const restartGame = () => {
    debugger;
    setRestartCounter((prev) => prev + 1);
    setCounter(0);
    setGameStatus({ isOn: true, info: "", gameOver: false });

    position.current = { x: 3, y: 4 };
    snake.current = [{ x: 3, y: 4 }];
    setDirection("R");
    setPoints(0);
    pointsRef.current = 0;
  };

  return (
    <>
      {true && (
        <div className="flex flex-col items-center justify-start pt-28 w-full h-screen-js bg-gray-600">
          <div className="flex justify-around w-full">
            <p className="text-gray-300">Status: {gameStatus.gameOver ? "❌GAME OVER❌" : "✅"}</p>
            <h1 className="text-gray-300">Punkty: {points} </h1>
            <h1 className="text-gray-300">
              Direction: <ShowDirection direction={direction} />{" "}
            </h1>
          </div>
          <div className="flex justify-around mb-8 w-full">
            <p className="text-gray-300">{gameStatus.info}</p>
            <button className="p-2 bg-gray-200 rounded-md" onClick={makeNextStep}>
              MOVE 🐍
            </button>
            <button className="p-2 bg-gray-200 rounded-md" onClick={restartGame}>
              RESTART
            </button>
          </div>

          {/* ROWS */}
          <div className="border-[1px] flex flex-col border-blue-600">
            {board.current.map((y, iy) => (
              <div key={iy} className="flex h-6 border-0 border-blue-600">
                {/* COLS */}
                {y.map((x, ix) => (
                  <div
                    key={BOARD_WIDTH * iy + ix}
                    className={`w-6 h-6 border-[1px] border-blue-600 text-xs 
                    ${board.current[iy][ix].snake ? "bg-green-500 rounded-md" : ""}  
                      ${board.current[iy][ix].star === true ? "bg-yellow-400" : ""}
                    }`}>
                    {/* {`X${x.x} Y${x.y}`} */}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Snake;

export const ShowDirection = ({ direction }) => {
  const emoji = () => {
    switch (direction) {
      case "R":
        return "➡️";
      case "L":
        return "⬅️";
      case "U":
        return "⬆️";
      case "D":
        return "⬇️";
      default:
        break;
    }
  };

  return <>{emoji()}</>;
};
