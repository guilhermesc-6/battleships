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
