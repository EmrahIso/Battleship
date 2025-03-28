import { Ship } from './shipCreator.js';

describe('Ship class test', () => {
  let testShip;

  beforeEach(() => {
    testShip = new Ship(4);
  });

  test('Instances hits property (1)', () => {
    expect(testShip.hits).toBe(0);
  });

  test('Instances size property (1)', () => {
    expect(testShip.size).toBe(4);
  });

  test('Instances sunk property (1)', () => {
    expect(testShip.sunk).toBeFalsy();
  });
});

describe('Ship Class object instance hit method tests', () => {
  let testShip;

  beforeEach(() => {
    testShip = new Ship(4);
  });

  test('Test functionality of hit() Ship class object instance method (1)', () => {
    testShip.hit();
    expect(testShip.hits).toBe(1);
  });

  test('Test functionality of hit() Ship class object instance method (2)', () => {
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.hits).toBe(4);
  });
});

describe('Ship class object instance isSunk method tests', () => {
  let testShip;

  beforeEach(() => {
    testShip = new Ship(4);
  });

  test('Test functionality of isSunk() Ship class object instance method (1)', () => {
    expect(testShip.isSunk()).toBeFalsy();
  });

  test('Test functionality of isSunk() Ship class object instance method (2)', () => {
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
  });
});
