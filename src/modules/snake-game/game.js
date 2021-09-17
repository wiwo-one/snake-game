export default function Game({ snakeHeadPosition, width, height }) {
  this.boardWidth = width;
  this.boardHeight = height;

  this.wallTeleport = true;

  const boardArr = [];
  for (let row = 0; row < this.boardHeight; row++) {
    const rowArr = [];
    for (let col = 0; col < this.boardWidth; col++) {
      rowArr.push({ x: col, y: row, snake: false, star: false });
    }
    boardArr.push(rowArr);
  }

  this.boardArr = boardArr;

  //points
  this.points = 0;
  this.addPoint = function () {
    this.points++;
  };

  //game status
  this.gameStatus = { isOn: true, info: "", gameOver: false };

  //current direction
  this.direction = "R";

  const randomPosition = () => {
    return {
      x: Math.floor(Math.random() * this.boardWidth),
      y: Math.floor(Math.random() * this.boardHeight),
    };
  };

  this.starPosition = randomPosition();

  this.snakeHeadPosition = snakeHeadPosition;
  this.snake = new Snake({ startPosition: snakeHeadPosition });

  this.getSnakeArray = this.snake.getSnakeArray;

  const moveSnake = ({ x, y }, add = false) => {
    this.snakeHeadPosition = { x, y };
    this.snake.moveSnakeBody({ x, y }, add);
    //if (add) this.snake.addOnePart({ x, y });
  };

  this.makeNextStep = () => {
    //debugger;
    let { x, y } = this.snakeHeadPosition;
    const { direction } = this;
    if (direction === "L") x = x - 1;
    if (direction === "R") x = x + 1;
    if (direction === "D") y = y + 1;
    if (direction === "U") y = y - 1;

    //check if move valid
    if (x < 0 || y < 0 || x >= this.boardWidth || y >= this.boardHeight) {
      if (this.wallTeleport) {
        if (x < 0) x = this.boardWidth + x;
        if (y < 0) y = this.boardWidth + y;
        if (x >= this.boardWidth) x = x - this.boardWidth;
        if (y >= this.boardWidth) y = y - this.boardHeight;
        moveSnake({ x: x, y: y });
      } else {
        console.log("❌ GAME OVER 😔");
        return;
      }
    } else if (x === this.starPosition.x && y === this.starPosition.y) {
      //PUNKT
      this.points += 1;
      console.log("yeah ⭐ punkty: " + this.points);
      this.starPosition = randomPosition();
      moveSnake({ x: x, y: y }, true);
    } else if (this.getSnakeArray().filter((sn) => (sn.x === x) & (sn.y === y)).length > 0) {
      console.log("❌ GAME OVER 🍰🍰🍰🍰 ZJADŁEM SIĘ 😔");
    } else {
      moveSnake({ x: x, y: y });
    }
  };

  this.printGameInfo = () => {
    this.snake.printSnakeInfo();
    console.dir(this);
  };
}

function Snake({ startPosition }) {
  this.length = 1;
  this.head = { x: startPosition.x, y: startPosition.y, next: null, prev: null };
  let tail = this.head;
  //const body = [this.head]

  this.addOnePart = (position) => {
    const newEl = {
      prev: tail,
      next: null,
      x: position.x,
      y: position.y,
    };

    tail.next = newEl;
    tail = newEl;
    this.length += 1;
  };

  this.moveSnakeBody = ({ x, y }, add) => {
    const moveNext = ({ x, y }, pointer) => {
      const prevX = pointer.x;
      const prevY = pointer.y;
      pointer.x = x;
      pointer.y = y;
      if (pointer.next) moveNext({ x: prevX, y: prevY }, pointer.next);
      //to add element one step earlier - pass prevx and prevY
      else if (!pointer.next && add) this.addOnePart({ x: x, y: y });
    };

    moveNext({ x: x, y: y }, this.head);
  };

  this.getSnakeArray = () => {
    const resArr = [];
    let pointer = this.head;
    while (pointer) {
      resArr.push({ x: pointer.x, y: pointer.y });
      pointer = pointer.next;
    }
    return resArr;
  };

  this.printSnakeInfo = () => {
    console.log(`Snake length: ${this.length} || headPosition X:${this.head.x}|Y:${this.head.y}`);
    let pointer = this.head;
    while (pointer) {
      console.log(`X:${pointer.x}|Y:${pointer.y}`);
      pointer = pointer.next;
    }
  };
}
