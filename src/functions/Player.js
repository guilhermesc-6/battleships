export const Player = (userSquares, computerSquares) => {
  let isGameOver = false;
  let currentPlayer = "user";
  let shotFired = -1;
  const displayGrid = document.querySelector(".grid-display");
  const turnDisplay = document.querySelector("#info-turn");
  const infoDisplay = document.querySelector("#info");
  const userGrid = document.querySelector(".grid-user");
  const computerGrid = document.querySelector(".grid-computer");
  const startButton = document.querySelector("#start");
  const enterButton = document.querySelector(".enter");
  const enterDisplay = document.querySelector(".start-display");
  const title = document.querySelector(".start-display h1");

  const playGame = () => {
    if (isGameOver) return;
    if (displayGrid.children.length !== 0) {
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
    let square = Math.floor(Math.random() * userSquares.length);
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
      title.innerHTML = "You win";
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
      title.innerHTML = "Computer win";
      gameOver();
    }
  };

  const gameOver = () => {
    isGameOver = true;
    // startButton.removeEventListener("click", playGame);
    computerSquares.forEach((square) =>
      square.removeEventListener("click", () => {})
    );
    turnDisplay.innerHTML = "";
    infoDisplay.innerHTML = "";
    enterDisplay.style.height = "100vh";
    enterDisplay.style.zIndex = "100";
    enterDisplay.style.opacity = "1";
    enterButton.innerHTML = "Play Again";
  };

  return { playGame };
};
