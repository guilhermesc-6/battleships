import JSDOMEnvironment from "jest-environment-jsdom";
import { GameBoard } from "../src/functions/Gameboard";
import { Ships } from "../src/functions/Ships";
import { Player } from "../src/functions/Player";
jest.mock("../src/functions/Gameboard");
jest.mock("../src/functions/Ships");
jest.mock("../src/functions/Player");

/**
 * @jest-environment jsdom
 */

test("gameboard contructor", () => {
  const gameboard = GameBoard();
  expect(GameBoard).toHaveBeenCalledTimes(1);
});
test("ships contructor", () => {
  const ships = Ships();
  expect(Ships).toHaveBeenCalledTimes(1);
});
test("player contructor", () => {
  const player = Player();
  expect(Player).toHaveBeenCalledTimes(1);
});
