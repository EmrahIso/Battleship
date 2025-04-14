// This gameControl module represents the game logic.
// gameControl uses the Player, GameBoard, Ship classes to create fully a playable battleship game.
// gameControl also provides one self-explanatory method: gameWinner().

import { Player } from '../classes/playerCreator.js';
import { GameBoard } from '../classes/gameboardCreator.js';
import { Ship } from '../classes/shipCreator.js';

const gameControl = ({
  mode,
  playsFirst,
  aiDifficulty,
  boardOrg,
  boardBlue,
}) => {
  // Create Orange Fleet Player
  const orgPlayer = new Player(
    mode === 'pvp' ? 'human' : playsFirst === 'org' ? 'human' : 'ai',
  );

  // Create Blue Fleet Player
  const bluePlayer = new Player(
    mode === 'pvp' ? 'human' : playsFirst === 'blue' ? 'human' : 'ai',
  );

  // Create Orange Fleet Board
  const orgBoard = new GameBoard();
  orgPlayer.gameBoard = orgBoard;

  // Create Blue Fleet Board
  const blueBoard = new GameBoard();
  bluePlayer.gameBoard = blueBoard;

  // Ships Obj => object that stores all needed information about ships (stores all ship instances, coordinates);

  const ships = { blue: [], org: [], blueCords: {}, orgCords: {} };

  // Loop to gather all ships

  for (let i = 0; i <= 1; i++) {
    switch (i) {
      case 0:
        // Create Org Ships
        for (let j = 1; j <= 5; j++) {
          const ship = new Ship(
            boardOrg.reduce(
              (total, currentValue) =>
                Number(currentValue) === j ? total + 1 : total,
              0,
            ),
          );
          ships.org.push(ship);
        }
      case 1:
        // Create Blue Ships
        for (let j = 1; j <= 5; j++) {
          const ship = new Ship(
            boardBlue.reduce(
              (total, currentValue) =>
                Number(currentValue) === j ? total + 1 : total,
              0,
            ),
          );
          ships.blue.push(ship);
        }
        break;
    }
  }

  // Loop to gather all ships cords

  for (let i = 0; i <= 1; i++) {
    switch (i) {
      case 0:
        // Find Org Ships coordinates
        for (let j = 1; j <= 5; j++) {
          let cordsArr = [];

          boardOrg.forEach((cell, index) => {
            if (cell === j) {
              let cords = [];

              cords[0] = Math.floor(index / 10);
              cords[1] = index % 10;

              cordsArr.push(cords);
            }
          });

          ships.orgCords[j] = cordsArr;
        }
        break;
      case 1:
        // Find Blue Ships coordinates
        for (let j = 1; j <= 5; j++) {
          let cordsArr = [];

          boardBlue.forEach((cell, index) => {
            if (cell === j) {
              let cords = [];

              cords[0] = Math.floor(index / 10);
              cords[1] = index % 10;

              cordsArr.push(cords);
            }
          });

          ships.blueCords[j] = cordsArr;
        }
        break;
    }
  }

  // Orange ships

  let orangeShips = {
    patrolOrg: ships.org[0],
    submarineOrg: ships.org[1],
    destroyerOrg: ships.org[2],
    battleshipOrg: ships.org[3],
    carrierOrg: ships.org[4],
  };

  // Place all orangeShips into orangeFleet board

  orgBoard.placeShip(ships.orgCords[1], orangeShips.patrolOrg.size);
  orgBoard.placeShip(ships.orgCords[2], orangeShips.submarineOrg.size);
  orgBoard.placeShip(ships.orgCords[3], orangeShips.destroyerOrg.size);
  orgBoard.placeShip(ships.orgCords[4], orangeShips.battleshipOrg.size);
  orgBoard.placeShip(ships.orgCords[5], orangeShips.carrierOrg.size);

  // Blue ships

  let blueShips = {
    patrolBlue: ships.blue[0], // These are array indexes
    submarineBlue: ships.blue[1],
    destroyerBlue: ships.blue[2],
    battleshipBlue: ships.blue[3],
    carrierBlue: ships.blue[4],
  };

  // Place all blueShips into blueFleet board

  blueBoard.placeShip(ships.blueCords[1], blueShips.patrolBlue.size); // These are objects properties
  blueBoard.placeShip(ships.blueCords[2], blueShips.submarineBlue.size);
  blueBoard.placeShip(ships.blueCords[3], blueShips.destroyerBlue.size);
  blueBoard.placeShip(ships.blueCords[4], blueShips.battleshipBlue.size);
  blueBoard.placeShip(ships.blueCords[5], blueShips.carrierBlue.size);

  // gameWinner() determines the winner of the game.
  // returns false if the game is not over.
  // returns 'org' or 'blue' based on which player won the game.

  const gameWinner = () => {
    if (orgBoard.areAllShipsSunk()) {
      return 'blue';
    } else if (blueBoard.areAllShipsSunk()) {
      return 'org';
    } else {
      return false;
    }
  };

  return {
    orgBoard,
    blueBoard,
    gameWinner,
  };
};

export { gameControl };
