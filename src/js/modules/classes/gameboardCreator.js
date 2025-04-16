// Class for GameBoard instances

import { Ship } from './shipCreator.js';

class GameBoard {
  constructor() {
    this.board = this.#buildBoard();
  }

  #numberOfPlacedShips = 0;
  #shipIdentifiers = {};

  #buildBoard() {
    // Board is a graph using adjacency matrices representation
    // Board 10 * 10

    const boardArray = [];

    for (let i = 0; i < 10; i++) {
      const rowArray = [];

      for (let j = 0; j < 10; j++) {
        rowArray.push(0);
      }

      boardArray.push(rowArray);
    }

    return boardArray;
  }

  #placeShipCordsValidity(cords, size) {
    // Required format:
    // 1. argument => array of arrays cords
    // 2. argument => number
    // 3. length of arguments is 2
    // 4. firstArguments length match second argument

    if (
      !Array.isArray(cords) ||
      !Number.isInteger(size) ||
      arguments.length !== 2
    ) {
      throw Error(
        'Invalid function call: the arguments passed are not in the required format',
      );
    }

    if (cords.length !== size) {
      throw Error(
        'Invalid ship placement: coordinates length must match ship size.',
      );
    }

    for (let cordArr of cords) {
      if (!Array.isArray(cordArr)) {
        throw Error(
          'Invalid function call: the arguments passed are not in the required format',
        );
      }
    }

    for (let cordArr of cords) {
      if (
        cordArr[0] < 0 ||
        cordArr[1] < 0 ||
        cordArr[0] > 9 ||
        cordArr[1] > 9
      ) {
        throw Error('Invalid ship placement: coordinates are off the board');
      }
    }

    for (let cordArr of cords) {
      if (this.board[cordArr[0]][cordArr[1]] !== 0) {
        throw Error('Invalid ship placement: ships cannot overlap');
      }
    }
  }

  #receiveAttackCordsPairValidity(cordArr) {
    // Required format:
    // 1. argument => array
    // 2. length of first argument is 2
    // 3. length of arguments is 1

    if (
      !Array.isArray(cordArr) ||
      cordArr.length !== 2 ||
      arguments.length !== 1
    ) {
      throw Error(
        'Invalid attack placement: pair of coordinates length must be one array with length of 2.',
      );
    }

    if (cordArr[0] < 0 || cordArr[1] < 0 || cordArr[0] > 9 || cordArr[1] > 9) {
      throw Error('Invalid attack placement: coordinates are off the board');
    }
  }

  placeShip(cords, size) {
    if (this.#numberOfPlacedShips >= 5) {
      throw Error('All ships are placed');
    }

    this.#placeShipCordsValidity.apply(this, arguments);

    const newShip = new Ship(size);

    this.#numberOfPlacedShips++;

    for (let cordArr of cords) {
      let rowIndex = cordArr[0];
      let columnIndex = cordArr[1];

      this.board[rowIndex][columnIndex] = this.#numberOfPlacedShips;
    }

    this.#shipIdentifiers[this.#numberOfPlacedShips] = newShip;
  }

  receiveAttack(cordArr) {
    this.#receiveAttackCordsPairValidity.apply(null, arguments);

    const identOnBoard = this.board[cordArr[0]][cordArr[1]];
    console.log('identOnBoard:', identOnBoard);

    let result;

    switch (identOnBoard) {
      case 0:
        result = false; // miss
        break;
      case null:
        result = null; // Already shot => miss
        break;
      case true:
        result = null; // Already shot => hit
        break;
      default:
        result = true; // hit
        break;
    }

    if (result === false) {
      this.board[cordArr[0]][cordArr[1]] = false; // miss
    } else if (result === true) {
      this.board[cordArr[0]][cordArr[1]] = true; // hit
      console.log(identOnBoard);
      this.#shipIdentifiers[identOnBoard].hit();
    }
    return result;
  }

  areAllShipsSunk() {
    let allAreSunk = true;
    for (let ship of Object.values(this.#shipIdentifiers)) {
      if (!ship.isSunk()) {
        allAreSunk = false;
      }
    }
    return allAreSunk;
  }
}

export { GameBoard };
