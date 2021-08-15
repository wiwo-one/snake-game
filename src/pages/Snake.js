import React, { useEffect, useRef, useState } from "react";

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 20;

const Snake = () => {
  const board = useRef([]);

  useEffect(() => {
    const boardArr = [];
    for (let row = 0; row < BOARD_HEIGHT; row++) {
      const rowArr = [];
      for (let col = 0; col < BOARD_WIDTH; col++) {
        rowArr.push({ x: col, y: row, bg: false, star: false });
      }
      boardArr.push(rowArr);
    }
    board.current = boardArr;
    return () => {};
  }, []);

  //const [position, setPosition] = useState({ x: 3, y: 4 });
  const position = useRef({ x: 3, y: 4 });
  const snake = useRef([{ x: 3, y: 4 }]);
  const [direction, setDirection] = useState("R");
  //const points = useRef(0);
  const [points, setPoints] = useState(0);
  const pointsRef = useRef(0);
  const [gameStatus, setGameStatus] = useState({ isOn: true, info: "", isError: false, gameOver: false });

  const moveSnake = ({ x, y }) => {
    //przewidz co sie stanie
    if (typeof board?.current[y] === "undefined" || typeof board?.current[y][x] === "undefined") {
      //wyjazd za linie - koniec
      console.log("❌ GAME OVER 😔");
      setGameStatus({ isOn: false, info: "You went out of the board", isError: true, gameOver: true });
    } else if (board.current[y][x]?.star) {
      //gwiazda zlapana
      console.log("yeah ⭐");
      pointsRef.current = pointsRef.current + 1;
      handlePointCatch({ x: x, y: y });
      snake.current.push({ x, y });
      position.current = { x, y };
      changeColor({ x, y, bgMark: true });
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
      setGameStatus({ isOn: false, info: "You bite yourself", isError: true, gameOver: true });
    } else {
      //gra dalej
      snake.current.push({ x, y });
      changeColor({ x: snake.current[0].x, y: snake.current[0].y, bgMark: false });
      snake.current = snake.current.splice(1);
      position.current = { x, y };
      changeColor({ x, y, bgMark: true });
    }
  };

  const makeNextStep = () => {
    let x = position.current.x;
    if (direction === "L") x = x - 1;
    else if (direction === "R") x = x + 1;
    let y = position.current.y;
    if (direction === "D") y = y + 1;
    else if (direction === "U") y = y - 1;

    moveSnake({ x: x, y: y });
    console.log("Doing move X:" + x + " Y:" + y);
  };

  const changeColor = ({ x, y, bgMark = null, starMark = null }, toggle = "snake") => {
    const newBoard = board.current.splice(0);

    newBoard.forEach((row, rowInd) => {
      if (rowInd === y) {
        if (toggle === "snake") {
          newBoard[rowInd][x].bg = !newBoard[rowInd][x].bg;
        } else if (toggle === "star") {
          newBoard[rowInd][x].star = !newBoard[rowInd][x].star;
        } else if (bgMark != null) {
          newBoard[rowInd][x].bg = bgMark;
        } else if (starMark != null) {
          newBoard[rowInd][x].star = starMark;
        }
      }
    });
    board.current = newBoard.splice(0);
    setCounter(counter + 1);
  };

  const checkKey = (e) => {
    e = e || window.event;
    let p = position.current;
    if (e.keyCode === "38" || e.code === "ArrowUp") {
      //moveSnake({ x: p.x, y: p.y - 1 });
      setDirection("U");
      console.log("up");
    } else if (e.keyCode === "40" || e.code === "ArrowDown") {
      //moveSnake({ x: p.x, y: p.y + 1 });
      setDirection("D");
      console.log("down");
    } else if (e.keyCode === "37" || e.code === "ArrowLeft") {
      //moveSnake({ x: p.x - 1, y: p.y });
      setDirection("L");
      console.log("left");
    } else if (e.keyCode === "39" || e.code === "ArrowRight") {
      //moveSnake({ x: p.x + 1, y: p.y });
      setDirection("R");
      console.log("right");
    }
  };

  const handlePointCatch = ({ x, y }) => {
    changeColor({ x, y }, "star");
    setPoints(points + 1);
    changeColor(
      { x: Math.floor(Math.random() * BOARD_WIDTH), y: Math.floor(Math.random() * BOARD_HEIGHT) },
      "star"
    );
  };

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(counter + 1);
  }, [board.current]);

  useEffect(() => {
    setPoints(pointsRef.current);
  }, [pointsRef.current]);

  useEffect(() => {
    document.addEventListener("keydown", checkKey);
    //snake start
    changeColor({ x: 3, y: 4 });
    //draw first star
    changeColor(
      { x: Math.floor(Math.random() * BOARD_WIDTH), y: Math.floor(Math.random() * BOARD_HEIGHT) },
      "star"
    );
    return () => {};
  }, []);

  const [intervalCounter, setIntervalCounter] = useState(0);

  useEffect(() => {
    let interval;
    if (gameStatus.isOn) {
      interval = setInterval(() => {
        console.log("interval");
        setIntervalCounter(intervalCounter + 1);
        makeNextStep();
      }, 300);
    }

    return () => {
      clearInterval(interval);
    };
  }, [intervalCounter]);

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

            <p className="text-gray-300">{gameStatus.isError ? "ERROR" : ""}</p>
          </div>

          {/* ROWS */}
          <div className="flex flex-col border-2 border-blue-600">
            {board.current.map((y, iy) => (
              <div key={iy} className="flex h-12 border-0 border-blue-600">
                {/* COLS */}
                {y.map((x, ix) => (
                  <div
                    key={BOARD_WIDTH * iy + ix}
                    className={`w-12 h-12 border-2 border-blue-600 text-xs ${
                      board.current[iy][ix]?.bg === true && "bg-green-500"
                    }  
                      ${board.current[iy][ix]?.star === true && "bg-yellow-400"}
                    }`}>{`X${x.x} Y${x.y}`}</div>
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
