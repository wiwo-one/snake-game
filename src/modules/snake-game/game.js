export default function Game({ snakeHeadPosition, width, height }) {
  this.wallTeleport = true;

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
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
  };

  this.starPosition = randomPosition();

  this.snake = new Snake({ startPosition: snakeHeadPosition });

  this.getNextPosition = () => {
    let { x, y } = this.snake.getHeadPosition();
    if (this.direction === "L") x = x - 1;
    if (this.direction === "R") x = x + 1;
    if (this.direction === "D") y = y + 1;
    if (this.direction === "U") y = y - 1;
    return { x, y };
  };

  this.makeNextStep = () => {
    //debugger;
    let { x, y } = this.getNextPosition();

    //check if move valid
    if (x < 0 || y < 0 || x >= width || y >= height) {
      if (this.wallTeleport) {
        if (x < 0) x = width + x;
        if (y < 0) y = width + y;
        if (x >= width) x = x - width;
        if (y >= width) y = y - height;
        this.snake.moveSnake({ x: x, y: y });
      } else {
        //console.log("â GAME OVER ð");
        return;
      }
    } else if (x === this.starPosition.x && y === this.starPosition.y) {
      //PUNKT
      this.points += 1;
      //console.log("yeah â­ punkty: " + this.points);
      this.starPosition = randomPosition();
      this.snake.moveSnake({ x, y }, true);
    } else if (this.snake.getSnakeArray().filter((sn) => (sn.x === x) & (sn.y === y)).length > 0) {
      //console.log("â GAME OVER ð°ð°ð°ð° ZJADÅEM SIÄ ð");
    } else {
      this.snake.moveSnake({ x, y });
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

  this.getHeadPosition = () => {
    return { x: this.head.x, y: this.head.y };
  };

  const addOnePart = (position) => {
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

  this.moveSnake = ({ x, y }, add) => {
    const moveNext = ({ x, y }, pointer) => {
      const prevX = pointer.x;
      const prevY = pointer.y;
      pointer.x = x;
      pointer.y = y;
      if (pointer.next) moveNext({ x: prevX, y: prevY }, pointer.next);
      //to add element one step earlier - pass prevx and prevY
      else if (!pointer.next && add) addOnePart({ x, y });
    };
    moveNext({ x, y }, this.head);
  };

  this.getSnakeArray = () => {
    const resArr = [];
    let count = 0;
    let pointer = this.head;
    while (pointer) {
      resArr.push({ x: pointer.x, y: pointer.y, index: count });
      pointer = pointer.next;
      count++;
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
