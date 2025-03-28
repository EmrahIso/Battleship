import { GameBoard } from './gameboardCreator';

class Player {
  constructor(type) {
    this.type = type;
    this.gameBoard = new GameBoard();
  }
}

export { Player };
