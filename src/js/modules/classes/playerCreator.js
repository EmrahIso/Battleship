// Class for Player instances

import { GameBoard } from './gameboardCreator.js';

class Player {
  constructor(type) {
    this.type = type;
    this.gameBoard = new GameBoard();
  }
}

export { Player };
