// This function places ships using AI intelligence.
// returns an array of coordinates (array of two integers)
const aiShipPlaceIndices = (shipLength) => {
  // In this logical validation of the auto-placing integer 10 represents the width of the board while integer 100 represents total number of board cells.

  const randomStartShipIndex = Math.floor(Math.random() * 100);

  const width = 10;
  const allCells = 100;

  shipLength = Number(shipLength);

  let randomBoolean = Math.random() > 0.5;
  let isShipHorizontal = randomBoolean;

  let validStart = isShipHorizontal
    ? randomStartShipIndex <= allCells - shipLength
      ? randomStartShipIndex
      : allCells - shipLength
    : randomStartShipIndex <= allCells - width * shipLength
      ? randomStartShipIndex
      : randomStartShipIndex - shipLength * width + width;

  let shipIndexCells = [];

  for (let i = 0; i < Number(shipLength); i++) {
    if (isShipHorizontal) {
      shipIndexCells.push(Number(validStart) + i);
    } else {
      shipIndexCells.push(Number(validStart) + i * width);
    }
  }

  let valid;

  if (isShipHorizontal) {
    shipIndexCells.every(
      (_shipIndexCell, index) =>
        (valid =
          shipIndexCells[0] % width !==
          width - (shipIndexCells.length - (index + 1))),
    );
  } else {
    shipIndexCells.every(
      (shipIndexCell, index) =>
        (valid = shipIndexCell < 90 + (width * index + 1)),
    );
  }

  return { valid: valid, shipIndexCells: shipIndexCells };
};

const usedCellsByAI = {}; // This object represents all cells that are attacked by AI, We need it only in player vs AI mode.

// This function attacks ships using AI intelligence.
// returns coordinates (array of two integers);
const aiAttackBoard = () => {
  const randomStartShipIndex = Math.floor(Math.random() * 100);

  // Validation
  let validStart = randomStartShipIndex >= 0 && randomStartShipIndex <= 99;

  if (validStart) {
    // If start is valid, we check if that cell is already attacked.
    if (usedCellsByAI[randomStartShipIndex] === undefined) {
      usedCellsByAI[randomStartShipIndex] = true;
      return randomStartShipIndex;
    } else {
      return aiAttackBoard();
    }
  }
};

export { aiShipPlaceIndices, aiAttackBoard };
