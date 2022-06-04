import { GameBoard } from "./functions/Gameboard.js";
import { Ships } from "./functions/Ships.js";
import { Player } from "./functions/Player.js";

const userGrid = document.querySelector(".grid-user");
const computerGrid = document.querySelector(".grid-computer");
const startButton = document.querySelector("#start");
const rotateButton = document.querySelector("#rotate");
const enterButton = document.querySelector(".enter");
const enterDisplay = document.querySelector(".start-display");

const shipArray = [
  {
    name: "destroyer",
    directions: [
      [0, 1],
      [0, 10],
    ],
  },
  {
    name: "submarine",
    directions: [
      [0, 1, 2],
      [0, 10, 10 * 2],
    ],
  },
  {
    name: "cruiser",
    directions: [
      [0, 1, 2],
      [0, 10, 10 * 2],
    ],
  },
  {
    name: "battleship",
    directions: [
      [0, 1, 2, 3],
      [0, 10, 10 * 2, 10 * 3],
    ],
  },
  {
    name: "carrier",
    directions: [
      [0, 1, 2, 3, 4],
      [0, 10, 10 * 2, 10 * 3, 10 * 4],
    ],
  },
];

console.log(document.querySelector(".grid-display"));

enterButton.addEventListener("click", () => {
  const gameBoard = GameBoard();

  const displayShips = document.querySelector(".grid-display");
  displayShips.innerHTML =
    '<div class="ship destroyer-container" draggable="true">\n          <div id="destroyer-0"></div>\n          <div id="destroyer-1"></div>\n        </div>\n        <div class="ship submarine-container" draggable="true">\n          <div id="submarine-0"></div>\n          <div id="submarine-1"></div>\n          <div id="submarine-2"></div>\n        </div>\n        <div class="ship cruiser-container" draggable="true">\n          <div id="cruiser-0"></div>\n          <div id="cruiser-1"></div>\n          <div id="cruiser-2"></div>\n        </div>\n        <div class="ship battleship-container" draggable="true">\n          <div id="battleship-0"></div>\n          <div id="battleship-1"></div>\n          <div id="battleship-2"></div>\n          <div id="battleship-3"></div>\n        </div>\n        <div class="ship carrier-container" draggable="true">\n          <div id="carrier-0"></div>\n          <div id="carrier-1"></div>\n          <div id="carrier-2"></div>\n          <div id="carrier-3"></div>\n          <div id="carrier-4"></div>\n        </div>\n';

  enterDisplay.style.height = "0";
  enterDisplay.style.zIndex = "-1";
  enterDisplay.style.opacity = "0";

  const userSquares = gameBoard.createBoard(userGrid);
  const computerSquares = gameBoard.createBoard(computerGrid);

  shipArray.forEach((ship) => gameBoard.generate(ship, computerSquares));

  const shipsController = Ships(userSquares);

  rotateButton.addEventListener("click", shipsController.rotate);

  const player = Player(userSquares, computerSquares);

  startButton.addEventListener("click", player.playGame);
});
