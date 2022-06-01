const userGrid = document.querySelector(".grid-user");
const computerGrid = document.querySelector(".grid-computer");
const displayGrid = document.querySelector(".grid-display");
const ships = document.querySelectorAll(".ship");
const destroyer = document.querySelector(".destroyer-container");
const submarine = document.querySelector(".submarine-container");
const cruiser = document.querySelector(".cruiser-container");
const battleship = document.querySelector(".battleship-container");
const carrier = document.querySelector(".carrier-container");
const startButton = document.querySelector("#start");
const rotateButton = document.querySelector("#rotate");
const turnDisplay = document.querySelector("#info-turn");
const infoDisplay = document.querySelector("#info");
const enterButton = document.querySelector(".enter");
const enterDisplay = document.querySelector(".start-display");
const userSquares = [];
const computerSquares = [];
let isHorizontal = true;
let isGameOver = false;
let currentPlayer = "user";
const width = 10;
let allShipsPlaced = false;
let shotFired = -1;

const shipArray = [
  {
    name: "destroyer",
    directions: [
      [0, 1],
      [0, width],
    ],
  },
  {
    name: "submarine",
    directions: [
      [0, 1, 2],
      [0, width, width * 2],
    ],
  },
  {
    name: "cruiser",
    directions: [
      [0, 1, 2],
      [0, width, width * 2],
    ],
  },
  {
    name: "battleship",
    directions: [
      [0, 1, 2, 3],
      [0, width, width * 2, width * 3],
    ],
  },
  {
    name: "carrier",
    directions: [
      [0, 1, 2, 3, 4],
      [0, width, width * 2, width * 3, width * 4],
    ],
  },
];

const GameBoard = () => {
  const createBoard = (grid, squares) => {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.dataset.id = i;
      grid.appendChild(square);
      squares.push(square);
    }
  };

  const generate = (ship) => {
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
      (index) => (randomStart + index) % width === width - 1
    );
    const isAtLeftEdge = current.some(
      (index) => (randomStart + index) % width === 0
    );

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
      current.forEach((index) =>
        computerSquares[randomStart + index].classList.add("taken", ship.name)
      );
    else generate(ship);
  };

  return { createBoard, generate };
};

const gameBoard = GameBoard();
gameBoard.createBoard(userGrid, userSquares);
gameBoard.createBoard(computerGrid, computerSquares);

const Ships = () => {
  const rotate = () => {
    if (isHorizontal) {
      destroyer.classList.toggle("destroyer-container-vertical");
      submarine.classList.toggle("submarine-container-vertical");
      cruiser.classList.toggle("cruiser-container-vertical");
      battleship.classList.toggle("battleship-container-vertical");
      carrier.classList.toggle("carrier-container-vertical");
      isHorizontal = false;
      return;
    }
    if (!isHorizontal) {
      destroyer.classList.toggle("destroyer-container-vertical");
      submarine.classList.toggle("submarine-container-vertical");
      cruiser.classList.toggle("cruiser-container-vertical");
      battleship.classList.toggle("battleship-container-vertical");
      carrier.classList.toggle("carrier-container-vertical");
      isHorizontal = true;
      return;
    }
  };

  let selectedShipNameWithIndex;
  let draggedShip;
  let draggedShipLength;

  const dragStart = (e) => {
    draggedShip = e.target;
    draggedShipLength = e.target.children.length;
  };
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = () => {
    // console.log("drag leave");
  };
  const dragDrop = (e) => {
    let shipNameWithLastId = draggedShip.lastElementChild.id;
    let shipClass = shipNameWithLastId.slice(0, -2);
    // console.log(shipClass)
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
    let shipLastId = lastShipIndex + parseInt(e.target.dataset.id);
    // console.log(shipLastId)
    const notAllowedHorizontal = [
      0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81,
      91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83,
      93,
    ];
    const notAllowedVertical = [
      99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82,
      81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64,
      63, 62, 61, 60,
    ];

    let newNotAllowedHorizontal = notAllowedHorizontal.splice(
      0,
      10 * lastShipIndex
    );
    let newNotAllowedVertical = notAllowedVertical.splice(
      0,
      10 * lastShipIndex
    );

    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));

    shipLastId = shipLastId - selectedShipIndex;
    // console.log(shipLastId)
    if (e.target.classList.contains("taken")) {
      return;
    }
    if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
      for (let i = 0; i < draggedShipLength; i++) {
        let directionClass;
        if (i === 0) directionClass = "start";
        if (i === draggedShipLength - 1) directionClass = "end";
        userSquares[
          parseInt(e.target.dataset.id) - selectedShipIndex + i
        ].classList.add("taken", "horizontal", directionClass, shipClass);
      }
      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
    } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
      for (let i = 0; i < draggedShipLength; i++) {
        let directionClass;
        if (i === 0) directionClass = "start";
        if (i === draggedShipLength - 1) directionClass = "end";
        userSquares[
          parseInt(e.target.dataset.id) - selectedShipIndex + width * i
        ].classList.add("taken", "vertical", directionClass, shipClass);
      }
    } else return;

    displayGrid.removeChild(draggedShip);
    if (!displayGrid.querySelector(".ship")) allShipsPlaced = true;
  };

  const dragEnd = () => {
    // console.log("dragend");
  };

  ships.forEach((ship) => ship.addEventListener("dragstart", dragStart));
  userSquares.forEach((square) =>
    square.addEventListener("dragstart", dragStart)
  );
  userSquares.forEach((square) =>
    square.addEventListener("dragover", dragOver)
  );
  userSquares.forEach((square) =>
    square.addEventListener("dragenter", dragEnter)
  );
  userSquares.forEach((square) =>
    square.addEventListener("dragleave", dragLeave)
  );
  userSquares.forEach((square) => square.addEventListener("drop", dragDrop));
  userSquares.forEach((square) => square.addEventListener("dragend", dragEnd));

  ships.forEach((ship) =>
    ship.addEventListener("mousedown", (e) => {
      selectedShipNameWithIndex = e.target.id;
    })
  );

  return { rotate };
};

const shipsController = Ships();

gameBoard.generate(shipArray[0]);
gameBoard.generate(shipArray[1]);
gameBoard.generate(shipArray[2]);
gameBoard.generate(shipArray[3]);
gameBoard.generate(shipArray[4]);

rotateButton.addEventListener("click", shipsController.rotate);

const Player = () => {
  const playGame = () => {
    if (isGameOver) return;
    if (!allShipsPlaced) {
      alert("Place all your ships");
      return;
    }
    if (currentPlayer === "user") {
      turnDisplay.innerHTML = "Your Turn";
      computerSquares.forEach((square) =>
        square.addEventListener("click", (e) => {
          shotFired = square.dataset.id;
          revealSquare(square.classList);
        })
      );
    }

    if (currentPlayer === "enemy") {
      turnDisplay.innerHTML = "Computer Turn";
      computerGrid.style.pointerEvents = "none";
      setTimeout(enemyGo, 1000);
    }
  };

  let destroyerCount = 0;
  let submarineCount = 0;
  let cruiserCount = 0;
  let battleshipCount = 0;
  let carrierCount = 0;

  const revealSquare = (classList) => {
    const enemySquare = computerGrid.querySelector(
      `div[data-id='${shotFired}']`
    );
    const obj = Object.values(classList);
    if (
      !enemySquare.classList.contains("boom") &&
      currentPlayer === "user" &&
      !isGameOver
    ) {
      if (obj.includes("destroyer")) destroyerCount++;
      if (obj.includes("submarine")) submarineCount++;
      if (obj.includes("cruiser")) cruiserCount++;
      if (obj.includes("battleship")) battleshipCount++;
      if (obj.includes("carrier")) carrierCount++;
    }
    if (obj.includes("taken")) {
      enemySquare.classList.add("boom");
    } else {
      enemySquare.classList.add("miss");
    }
    checkForWins();
    currentPlayer = "enemy";
    playGame();
  };

  let cpuDestroyerCount = 0;
  let cpuSubmarineCount = 0;
  let cpuCruiserCount = 0;
  let cpuBattleshipCount = 0;
  let cpuCarrierCount = 0;

  const enemyGo = () => {
    square = Math.floor(Math.random() * userSquares.length);
    if (!userSquares[square].classList.contains("boom")) {
      const hit = userSquares[square].classList.contains("taken");
      userSquares[square].classList.add(hit ? "boom" : "miss");
      if (userSquares[square].classList.contains("destroyer"))
        cpuDestroyerCount++;
      if (userSquares[square].classList.contains("submarine"))
        cpuSubmarineCount++;
      if (userSquares[square].classList.contains("cruiser")) cpuCruiserCount++;
      if (userSquares[square].classList.contains("battleship"))
        cpuBattleshipCount++;
      if (userSquares[square].classList.contains("carrier")) cpuCarrierCount++;
      checkForWins();
    }
    currentPlayer = "user";
    turnDisplay.innerHTML = "Your Turn";
    computerGrid.style.pointerEvents = "all";
  };

  const checkForWins = () => {
    if (destroyerCount == 2) {
      infoDisplay.innerHTML = "You sunk the computer`s destroyer";
      destroyerCount = 10;
    }
    if (submarineCount === 3) {
      infoDisplay.innerHTML = "You sunk the computer`s submarine";
      submarineCount = 10;
    }
    if (cruiserCount === 3) {
      infoDisplay.innerHTML = "You sunk the computer`s cruiser";
      cruiserCount = 10;
    }
    if (battleshipCount === 4) {
      infoDisplay.innerHTML = "You sunk the computer`s battleship";
      battleshipCount = 10;
    }
    if (carrierCount === 5) {
      infoDisplay.innerHTML = "You sunk the computer`s carrier";
      carrierCount = 10;
    }
    if (cpuDestroyerCount === 2) {
      infoDisplay.innerHTML = "Computer sunk youer destroyer";
      cpuDestroyerCount = 10;
    }
    if (cpuSubmarineCount === 3) {
      infoDisplay.innerHTML = "Computer sunk youer submarine";
      cpuSubmarineCount = 10;
    }
    if (cpuCruiserCount === 3) {
      infoDisplay.innerHTML = "Computer sunk youer cruiser";
      cpuCruiserCount = 10;
    }
    if (cpuBattleshipCount === 4) {
      infoDisplay.innerHTML = "Computer sunk youer battleship";
      cpuBattleshipCount = 10;
    }
    if (cpuCarrierCount === 5) {
      infoDisplay.innerHTML = "Computer sunk youer carrier";
      cpuCarrierCount = 10;
    }

    if (
      destroyerCount +
        submarineCount +
        cruiserCount +
        battleshipCount +
        carrierCount ===
      50
    ) {
      infoDisplay.innerHTML = "You win";
      gameOver();
    }
    if (
      cpuDestroyerCount +
        cpuSubmarineCount +
        cpuCruiserCount +
        cpuBattleshipCount +
        cpuCarrierCount ===
      50
    ) {
      infoDisplay.innerHTML = "Computer win";
      gameOver();
    }
  };

  const gameOver = () => {
    isGameOver = true;
    startButton.removeEventListener("click", player.playGame);
    computerSquares.forEach((square) =>
      square.removeEventListener("click", () => {})
    );
    enterDisplay.style.height = "100vh";
    enterDisplay.style.zIndex = "100";
    enterDisplay.style.opacity = "1";
  };

  return { playGame };
};

const player = Player();

enterButton.addEventListener("click", () => {
  enterDisplay.style.height = "0";
  enterDisplay.style.zIndex = "-1";
  enterDisplay.style.opacity = "0";
});

startButton.addEventListener("click", player.playGame);
