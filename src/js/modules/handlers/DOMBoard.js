// Module that stores handlers for GameBoard components.
import { aiShipPlaceIndices } from '../logic/aiLogic.js';

const DOMBoard = (function () {
  let currentBoard;
  let takenCells = [];

  // addShipComputer function uses aiShipPlaceIndices to collect coordinates where the ships should be place on the board, these functions could be one function, but they are separate because this aiShipPlaceIndices should not contain any DOM related code.
  const addShipComputer = (player, gameBoard, shipLength, shipIndex) => {
    const shipIndices = aiShipPlaceIndices(shipLength);

    let { valid, shipIndexCells } = shipIndices;

    const notTaken = shipIndexCells.every(
      (shipIndexCell) => !takenCells.includes(shipIndexCell),
    );

    if (valid && notTaken) {
      takenCells.push(...shipIndexCells);

      if (shipIndex === 4) {
        // Remove Computer controlled dialog when the fifth ship is placed
        document.querySelector(`[data-dialog-place-${player}]`).close();
        document
          .querySelector('[data-dialog-cont]')
          .querySelector(`[data-dialog-place-${player}]`)
          .replaceChildren();
        document
          .querySelector('[data-dialog-cont]')
          .querySelector(`[data-dialog-place-${player}]`)
          .remove();
      }

      shipIndexCells.forEach((cell, index) => {
        // aiShipPlaceIndices() function returns the cells indexed from 0 to 99 so first cell is 0.
        // I need to return cells indexed from 1 to 100 because of the id attributes of the cell elements in HTML
        // So I increase that index by one.

        shipIndexCells[index] = cell + 1; // 70 71 72 => error, dugme na endScreen ne radi zato sto se kreiraju dva endScreena.
      });

      return shipIndexCells;
    } else {
      // If it's not valid then run function again recursively
      return addShipComputer(player, gameBoard, shipLength, shipIndex);
    }
  };

  // addShipPlayer function uses Drag and Drop events to collect ship coordinates for player boards, also validates those coordinates and does not allow invalid coordinates to be placed on boards.
  const addShipPlayer = (
    gameBoard,
    shipLength,
    startCellIndex,
    isShipHorizontal,
    ship,
    shipType,
  ) => {
    const allBoardCells = Array.from(gameBoard.querySelectorAll(`[data-cell]`));

    const width = 10;
    const allCells = 100;

    shipLength = Number(shipLength);

    startCellIndex -= 1;

    let validStart = isShipHorizontal
      ? startCellIndex <= allCells - shipLength
        ? startCellIndex
        : allCells - shipLength
      : startCellIndex <= allCells - width * shipLength
        ? startCellIndex
        : startCellIndex - shipLength * width + width;

    let shipIndexElementCells = [];

    for (let i = 0; i < Number(shipLength); i++) {
      if (isShipHorizontal) {
        shipIndexElementCells.push(allBoardCells[Number(validStart) + i]);
      } else {
        shipIndexElementCells.push(
          allBoardCells[Number(validStart) + i * width],
        );
      }
    }

    let valid;

    if (isShipHorizontal) {
      shipIndexElementCells.every(
        (_shipIndexElementCell, index) =>
          (valid =
            Number(shipIndexElementCells[0].id - 1) % width !==
            width - (shipIndexElementCells.length - (index + 1))),
      );
    } else {
      shipIndexElementCells.every(
        (_shipIndexElementCell, index) =>
          (valid =
            Number(shipIndexElementCells[0].id) < 90 + (width * index + 1)),
      );
    }

    const notTaken = shipIndexElementCells.every(
      (shipIndexElementCell) =>
        !shipIndexElementCell.classList.contains('marked'),
    );

    if (valid && notTaken) {
      allBoardCells.forEach((cell) => {
        if (cell.classList.contains(`marked--${shipType}`)) {
          cell.classList.remove('marked', `marked--${shipType}`);
          cell.removeAttribute('data-game-board-cell-marked');
        }
      });

      shipIndexElementCells.forEach((shipCell) => {
        shipCell.classList.add(`marked`, `marked--${shipType}`);
        shipCell.setAttribute('data-game-board-cell-marked', '');
      });

      ship.setAttribute('data-ship-used', '');

      return shipIndexElementCells;
    }
  };

  let draggedShip;

  // dragAndDropShips function attaches events to the players gameBoards based on the argument.
  const dragAndDropShips = (player) => {
    const optionShips = Array.from(
      document.querySelectorAll(`[data-ship-${player}-cont] [draggable]`),
    );

    optionShips.forEach((optionShip) => {
      optionShip.addEventListener('dragstart', dragShipStart);
    });

    const gameBoard = document.querySelector(
      `[data-place-game-board-${player}]`,
    );

    currentBoard = gameBoard;

    gameBoard.addEventListener('dragover', dragShipOver);
    gameBoard.addEventListener('drop', dropShip);
  };

  // Handler for 'dragstart' event on gameBoard => Changes the variable currentBoard to the board on which the ships are currently dragged.
  const dragShipStart = (e) => {
    draggedShip = e.target;

    currentBoard =
      draggedShip.getAttribute('data-ship-org') === ''
        ? document.querySelector('[data-place-game-board-org]')
        : document.querySelector('[data-place-game-board-blue]');
  };

  // Handler for 'dragover' event on gameBoard => just prevents standards browsers behavior on that event.
  const dragShipOver = (e) => {
    e.preventDefault();
  };

  // Handler for 'drop' event on gameBoard => places the ship on the board based on where it was dropped (only if those coordinates are a valid position).
  const dropShip = (e) => {
    const startCellIndex = e.target.id;

    const ship = draggedShip;
    const shipLength = ship.getAttribute('data-ship-length');
    const isShipHorizontal =
      ship.getAttribute('data-state-vertical') === '' ? false : true;
    const shipType = ship.getAttribute('data-ship-type');

    addShipPlayer(
      currentBoard,
      shipLength,
      startCellIndex,
      isShipHorizontal,
      ship,
      shipType,
    );
  };

  return {
    dragAndDropShips,
    addShipComputer,
  };
})();

export { DOMBoard };
