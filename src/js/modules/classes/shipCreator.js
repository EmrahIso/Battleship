// Class for Ship instances

class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.hits >= this.size) {
      return true;
    } else {
      return false;
    }
  }
}

export { Ship };
