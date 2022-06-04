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

  return { createBoard, generate };
};
