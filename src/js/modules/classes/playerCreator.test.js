import { Player } from './playerCreator';
import { GameBoard } from './gameboardCreator';

describe('Player class test', () => {
  test('Player class should create object with given type argument (1)', () => {
    const player = new Player('human');
    expect(player.type).toBe('human');
  });

  test('Player class object instances gameBoard property should be instance of GameBoard class (1)', () => {
    const player = new Player('AI');
    expect(player.gameBoard).toBeInstanceOf(GameBoard);
  });
});
