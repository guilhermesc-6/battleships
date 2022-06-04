export const Ships = (userSquares) => {
  const ships = document.querySelectorAll(".ship");
  let isHorizontal = true;
  const destroyer = document.querySelector(".destroyer-container");
  const submarine = document.querySelector(".submarine-container");
  const cruiser = document.querySelector(".cruiser-container");
  const battleship = document.querySelector(".battleship-container");
  const carrier = document.querySelector(".carrier-container");
  const displayGrid = document.querySelector(".grid-display");
  let allShipsPlaced = false;

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

    let selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));

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
          parseInt(e.target.dataset.id) - selectedShipIndex + 10 * i
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
