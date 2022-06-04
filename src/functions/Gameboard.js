export const GameBoard = () => {
  const createBoard = (grid) => {
    let squares = [];
    grid.innerHTML = "";
    for (let i = 0; i < 10 * 10; i++) {
      const square = document.createElement("div");
      square.dataset.id = i;
      grid.appendChild(square);
      squares.push(square);
    }
    return squares;
  };

  const generate = (ship, computerSquares) => {
    let direction;
    // console.log(computerSquares);
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;
    let randomStart = Math.abs(
      Math.floor(
        Math.random() * computerSquares.length -
          ship.directions[0].length * direction
      )
    );

    const isTaken = current.some((index) =>
      computerSquares[randomStart + index].classList.contains("taken")
    );
    const isAtRightEdge = current.some(
      (index) => (randomStart + index) % 10 === 10 - 1
    );
    const isAtLeftEdge = current.some(
      (index) => (randomStart + index) % 10 === 0
    );

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
      current.forEach((index) =>
        computerSquares[randomStart + index].classList.add("taken", ship.name)
      );
    else generate(ship, computerSquares);
  };

  document.querySelector(".grid-display").innerHTML =
    '<div class="ship destroyer-container" draggable="true">\n          <div id="destroyer-0"></div>\n          <div id="destroyer-1"></div>\n        </div>\n        <div class="ship submarine-container" draggable="true">\n          <div id="submarine-0"></div>\n          <div id="submarine-1"></div>\n          <div id="submarine-2"></div>\n        </div>\n        <div class="ship cruiser-container" draggable="true">\n          <div id="cruiser-0"></div>\n          <div id="cruiser-1"></div>\n          <div id="cruiser-2"></div>\n        </div>\n        <div class="ship battleship-container" draggable="true">\n          <div id="battleship-0"></div>\n          <div id="battleship-1"></div>\n          <div id="battleship-2"></div>\n          <div id="battleship-3"></div>\n        </div>\n        <div class="ship carrier-container" draggable="true">\n          <div id="carrier-0"></div>\n          <div id="carrier-1"></div>\n          <div id="carrier-2"></div>\n          <div id="carrier-3"></div>\n          <div id="carrier-4"></div>\n        </div>\n';

  return { createBoard, generate };
};
