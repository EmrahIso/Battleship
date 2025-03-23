import { GameBoard } from './gameboardCreator';

describe('GameBoard class test', () => {
  const testGameBoard = new GameBoard();

  const boardFormat = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  test('Is the instance objects board in the right format (1)', () => {
    expect(testGameBoard.board).toEqual(boardFormat);
  });
});

describe('GameBoard class object instance placeShip method tests', () => {
  let testGameBoard;

  // Required format:
  // 1. argument => array of arrays cords
  // 2. argument => number
  // 3. length of arguments is 2
  // 4. firstArguments length match second argument

  beforeEach(() => {
    testGameBoard = new GameBoard();
  });

  const sliceVertically = (board, cords) => {
    const finalArray = [];
    for (let cordArr of cords) {
      finalArray.push(board[cordArr[0]][cordArr[1]]);
    }
    return finalArray;
  };

  test('placeShip() method should throw error if all ships are already placed', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
      ],
      2,
    );
    testGameBoard.placeShip(
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      3,
    );
    testGameBoard.placeShip(
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      3,
    );
    testGameBoard.placeShip(
      [
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 3],
      ],
      4,
    );
    testGameBoard.placeShip(
      [
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
      ],
      5,
    );

    expect(() => testGameBoard.placeShip([8, 8], 1)).toThrow(
      'All ships are placed',
    );
  });

  test('placeShip() method should throw error if cords length does not match ship size', () => {
    expect(() =>
      testGameBoard.placeShip(
        [
          [0, 0],
          [0, 1],
        ],
        3,
      ),
    ).toThrow(
      'Invalid ship placement: coordinates length must match ship size.',
    );
  });

  test('placeShip() should throw Error if ship overlaps board (1)', () => {
    expect(() => testGameBoard.placeShip([[0, 10]], 1)).toThrow(
      'Invalid ship placement: coordinates are off the board',
    );
    expect(() =>
      testGameBoard.placeShip(
        [
          [0, 6],
          [-1, 2],
        ],
        2,
      ),
    ).toThrow('Invalid ship placement: coordinates are off the board');
  });

  test('placeShip() should throw Error if ship overlaps another ship (1)', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      4,
    );
    testGameBoard.placeShip(
      [
        [2, 2],
        [2, 3],
        [2, 4],
      ],
      3,
    );

    expect(() =>
      testGameBoard.placeShip(
        [
          [2, 1],
          [1, 1],
          [0, 1],
        ],
        3,
      ),
    ).toThrow('Invalid ship placement: ships cannot overlap');
  });

  test('placeShip() should throw Error if ship overlaps another ship (2)', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      4,
    );

    expect(() =>
      testGameBoard.placeShip(
        [
          [0, 3],
          [0, 4],
        ],
        2,
      ),
    ).toThrow('Invalid ship placement: ships cannot overlap');
  });

  test('placeShip() should throw Error if arguments are not in the required format (1)', () => {
    expect(() => testGameBoard.placeShip({ 1: 1 }, 2)).toThrow(
      'Invalid function call: the arguments passed are not in the required format',
    );
  });

  test('placeShip() should throw Error if arguments are not in the required format (2)', () => {
    expect(() => testGameBoard.placeShip([1, 2], 2)).toThrow(
      'Invalid function call: the arguments passed are not in the required format',
    );
  });

  test('placeShip() should throw Error if arguments are not in the required format (3)', () => {
    expect(() => testGameBoard.placeShip([[1, 2]], '2')).toThrow(
      'Invalid function call: the arguments passed are not in the required format',
    );
  });

  test('placeShip() should throw Error if arguments are not in the required format (4)', () => {
    expect(() =>
      testGameBoard.placeShip(
        [
          [1, 2],
          [1, 3],
        ],
        1,
        5,
        6,
      ),
    ).toThrow(
      'Invalid function call: the arguments passed are not in the required format',
    );
  });

  test('Test functionality of placeShip() class object instance method (1: Horizontally)', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      4,
    );

    expect(testGameBoard.board[0].slice(0, 4)).toEqual([1, 1, 1, 1]);
  });

  test('Test functionality of placeShip() class object instance method (2: Vertically)', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      4,
    );

    testGameBoard.placeShip(
      [
        [5, 5],
        [4, 5],
        [3, 5],
      ],
      3,
    );

    expect(
      sliceVertically(testGameBoard.board, [
        [5, 5],
        [4, 5],
        [3, 5],
      ]),
    ).toEqual([2, 2, 2]);
  });
});

describe('GameBoard class object instance receiveAttack method tests', () => {
  let testGameBoard;

  // Required format:
  // 1. argument => array
  // 2. length of first argument is 2
  // 3. length of arguments is 1

  beforeEach(() => {
    testGameBoard = new GameBoard();
  });

  test('receiveAttack() should throw Error if pair of Cords overlaps board (1)', () => {
    expect(() => testGameBoard.receiveAttack([0, 10])).toThrow(
      'Invalid attack placement: coordinates are off the board',
    );
    expect(() => testGameBoard.receiveAttack([-3, -5])).toThrow(
      'Invalid attack placement: coordinates are off the board',
    );
  });

  test('receiveAttack() should throw Error if argument cordsArr is not in the required format: [x, y] (1)', () => {
    expect(() => testGameBoard.receiveAttack([0, 5, 6])).toThrow(
      'Invalid attack placement: pair of coordinates length must be one array with length of 2.',
    );
    expect(() => testGameBoard.receiveAttack([0, 5], [0, 8])).toThrow(
      'Invalid attack placement: pair of coordinates length must be one array with length of 2.',
    );
  });

  test('receiveAttack() should throw Error if argument cordsArr is not in the required format: [x, y] (2)', () => {
    expect(() => testGameBoard.receiveAttack({ 0: 0, 5: 5 })).toThrow(
      'Invalid attack placement: pair of coordinates length must be one array with length of 2.',
    );
  });

  test('receiveAttack() should throw Error if argument cordsArr is not in the required format: [x, y] (3)', () => {
    expect(() => testGameBoard.receiveAttack([1, 2], 4, 5)).toThrow(
      'Invalid attack placement: pair of coordinates length must be one array with length of 2.',
    );
  });

  test('Test functionality of receiveAttack() class object instance method (1)', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      4,
    );

    testGameBoard.receiveAttack([0, 0]);
    testGameBoard.receiveAttack([0, 1]);
    testGameBoard.receiveAttack([0, 2]);
    testGameBoard.receiveAttack([0, 3]);

    const boardFormat = [
      [null, null, null, null, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    expect(testGameBoard.board).toEqual(boardFormat);
  });

  test('Test functionality of receiveAttack() class object instance method (2)', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
      ],
      2,
    );

    testGameBoard.placeShip(
      [
        [3, 1],
        [4, 1],
      ],
      2,
    );

    testGameBoard.receiveAttack([0, 0]);
    testGameBoard.receiveAttack([0, 1]);
    testGameBoard.receiveAttack([8, 8]);

    const boardFormat = [
      [null, null, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, null, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    expect(testGameBoard.board).toEqual(boardFormat);
  });

  test('Test return value of receiveAttack() class object instance method (1): hit should return true', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
      ],
      2,
    );

    expect(testGameBoard.receiveAttack([0, 1])).toBeTruthy();
  });

  test('Test return value of receiveAttack() class object instance method (2): miss should return false', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
      ],
      2,
    );

    expect(testGameBoard.receiveAttack([2, 2])).toBeFalsy();
  });

  test('Test return value of receiveAttack() class object instance method (3): already shot should return null', () => {
    testGameBoard.receiveAttack([2, 2]);

    expect(testGameBoard.receiveAttack([2, 2])).toBeNull();
  });
});

describe('GameBoard class object instance areAllShipsSunk method tests', () => {
  let testGameBoard;

  beforeEach(() => {
    testGameBoard = new GameBoard();
  });

  test('Test functionality of areAllShipsSunk() class object instance method (1)', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      4,
    );

    testGameBoard.receiveAttack([0, 0]);
    testGameBoard.receiveAttack([0, 1]);
    testGameBoard.receiveAttack([0, 2]);
    testGameBoard.receiveAttack([0, 3]);

    expect(testGameBoard.areAllShipsSunk()).toBeTruthy();
  });

  test('Test functionality of areAllShipsSunk() class object instance method (2)', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      4,
    );

    testGameBoard.receiveAttack([0, 0]);
    testGameBoard.receiveAttack([0, 2]);
    testGameBoard.receiveAttack([0, 3]);

    expect(testGameBoard.areAllShipsSunk()).toBeFalsy();
  });

  test('Test functionality of areAllShipsSunk() class object instance method (3)', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
      ],
      2,
    );
    testGameBoard.placeShip(
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      3,
    );
    testGameBoard.placeShip(
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      3,
    );
    testGameBoard.placeShip(
      [
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 3],
      ],
      4,
    );
    testGameBoard.placeShip(
      [
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
      ],
      5,
    );

    testGameBoard.receiveAttack([4, 0]);
    testGameBoard.receiveAttack([4, 1]);
    testGameBoard.receiveAttack([4, 2]);
    testGameBoard.receiveAttack([4, 3]);
    testGameBoard.receiveAttack([4, 4]);
    testGameBoard.receiveAttack([3, 0]);
    testGameBoard.receiveAttack([3, 1]);
    testGameBoard.receiveAttack([3, 2]);
    testGameBoard.receiveAttack([3, 3]);
    testGameBoard.receiveAttack([2, 0]);
    testGameBoard.receiveAttack([2, 1]);
    testGameBoard.receiveAttack([2, 2]);
    testGameBoard.receiveAttack([1, 0]);
    testGameBoard.receiveAttack([1, 1]);
    testGameBoard.receiveAttack([1, 2]);
    testGameBoard.receiveAttack([0, 0]);
    testGameBoard.receiveAttack([0, 1]);

    expect(testGameBoard.areAllShipsSunk()).toBeTruthy();
  });

  test('Test functionality of areAllShipsSunk() class object instance method (4)', () => {
    testGameBoard.placeShip(
      [
        [0, 0],
        [0, 1],
      ],
      2,
    );
    testGameBoard.placeShip(
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      3,
    );
    testGameBoard.placeShip(
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      3,
    );
    testGameBoard.placeShip(
      [
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 3],
      ],
      4,
    );
    testGameBoard.placeShip(
      [
        [4, 0],
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
      ],
      5,
    );

    testGameBoard.receiveAttack([4, 0]);
    testGameBoard.receiveAttack([4, 1]);
    testGameBoard.receiveAttack([4, 2]);
    testGameBoard.receiveAttack([4, 3]);
    testGameBoard.receiveAttack([3, 2]);
    testGameBoard.receiveAttack([3, 3]);
    testGameBoard.receiveAttack([2, 0]);
    testGameBoard.receiveAttack([2, 1]);
    testGameBoard.receiveAttack([2, 2]);
    testGameBoard.receiveAttack([1, 0]);
    testGameBoard.receiveAttack([1, 1]);
    testGameBoard.receiveAttack([0, 1]);

    expect(testGameBoard.areAllShipsSunk()).toBeFalsy();
  });
});
