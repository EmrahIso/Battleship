// Logic
import { aiAttackBoard } from './logic/aiLogic.js';
import { gameControl } from './logic/gameControl.js';

// Handlers
import { DOMScreenGameFlowControl } from './handlers/DOMScreenGameFlowControl.js';
import { DOMDialog } from './handlers/DOMDialog.js';

// UI Components
import { UIEndScreenDialog } from './UI/UIDialog.js';
import { UICreateBoard } from './UI/UIBoard.js';

// Dynamic listeners

let game;
let onMove;

// Create two initial boards for two main Players of this game => orange and blue.

UICreateBoard(document.querySelector('.main__content'), 'org', false);
UICreateBoard(document.querySelector('.main__content'), 'blue', false);

// screenGameControl => main function that uses collected information about game and initiates and controls the flow of the game.

const screenGameControl = ({ mode, playsFirst, boardOrg, boardBlue }) => {
  onMove = playsFirst;

  // gameControl => To have access to logical part of the game flow control.

  game = gameControl({
    mode,
    playsFirst,
    boardOrg,
    boardBlue,
  });

  switchPlayerBoards(playsFirst); // For the initial rendering of the boards.

  const orangeBoardEl = document.querySelector('[data-game-board-org]');

  const blueBoardEl = document.querySelector('[data-game-board-blue]');

  switch (mode) {
    case 'pvp':
      orangeBoardEl.addEventListener(
        'click',
        DOMScreenGameFlowControl.boardCellPVPClickEventHandler,
      );

      blueBoardEl.addEventListener(
        'click',
        DOMScreenGameFlowControl.boardCellPVPClickEventHandler,
      );
      break;
    case 'pvai':
      switch (playsFirst) {
        case 'org':
          blueBoardEl.addEventListener(
            'click',
            DOMScreenGameFlowControl.boardCellPVAiClickEventHandler,
          );
          break;
        case 'blue':
          orangeBoardEl.addEventListener(
            'click',
            DOMScreenGameFlowControl.boardCellPVAiClickEventHandler,
          );
          break;
      }
      break;
  }
};

// renderNonClickableBoard function renders all cells (hit, miss, empty) on the non-clickable board (the board the player is currently in attack mode)

const renderNonClickableBoard = (player) => {
  // NonClickable board means that we can't attack ships on that board and the board is in attacking state.
  const board = document.querySelector(`[data-game-board-${player}]`);

  const allBoardCells = board.querySelectorAll('[data-cell]');

  const onMoveEl = document.querySelector('[data-on-move]');
  onMoveEl.removeAttribute(
    `data-move-${player === 'org' ? 'blue' : 'org'}`,
    '',
  );
  onMoveEl.setAttribute(`data-move-${player}`, '');

  allBoardCells.forEach((cell) => {
    cell.style.backgroundColor = 'transparent';
    cell.style.pointerEvents = 'all';
  });

  switch (player) {
    case 'org':
      game.orgBoard.board.forEach((cellArr, arrIndex) => {
        cellArr.forEach((cell, index) => {
          allBoardCells[arrIndex * 10 + index].style.pointerEvents = 'none';
          if (cell === true) {
            allBoardCells[arrIndex * 10 + index].style.backgroundColor = 'red';
          } else if (cell === false) {
            allBoardCells[arrIndex * 10 + index].style.backgroundColor = 'grey';
          }
        });
      });
      break;
    case 'blue':
      game.blueBoard.board.forEach((cellArr, arrIndex) => {
        cellArr.forEach((cell, index) => {
          allBoardCells[arrIndex * 10 + index].style.pointerEvents = 'none';
          if (cell === true) {
            allBoardCells[arrIndex * 10 + index].style.backgroundColor = 'red';
          } else if (cell === false) {
            allBoardCells[arrIndex * 10 + index].style.backgroundColor = 'grey';
          }
        });
      });
  }
};

// renderClickableBoard function renders all cells (hit, miss, empty) on the clickable board (the board the player is currently in defense mode)

const renderClickableBoard = (player) => {
  // Clickable board means that we can attack ships on that board and the board is in defensive state.
  const board = document.querySelector(`[data-game-board-${player}]`);

  const allBoardCells = board.querySelectorAll('[data-cell]');

  allBoardCells.forEach((cell) => {
    cell.style.backgroundColor = 'transparent';
    cell.style.pointerEvents = 'all';
  });

  switch (player) {
    case 'org':
      game.orgBoard.board.forEach((cellArr, arrIndex) => {
        cellArr.forEach((cell, index) => {
          if (cell === true) {
            allBoardCells[arrIndex * 10 + index].style.backgroundColor = 'red';
            allBoardCells[arrIndex * 10 + index].style.pointerEvents = 'none';
          } else if (cell === false) {
            allBoardCells[arrIndex * 10 + index].style.backgroundColor = 'grey';
            allBoardCells[arrIndex * 10 + index].style.pointerEvents = 'none';
          }
        });
      });
      break;
    case 'blue':
      game.blueBoard.board.forEach((cellArr, arrIndex) => {
        cellArr.forEach((cell, index) => {
          if (cell === true) {
            allBoardCells[arrIndex * 10 + index].style.backgroundColor = 'red';
            allBoardCells[arrIndex * 10 + index].style.pointerEvents = 'none';
          } else if (cell === false) {
            allBoardCells[arrIndex * 10 + index].style.backgroundColor = 'grey';
            allBoardCells[arrIndex * 10 + index].style.pointerEvents = 'none';
          }
        });
      });
  }
};

// switchPlayerBoards function changes defense and attack states between two boards when needed.
const switchPlayerBoards = (newActivePlayer) => {
  onMove = newActivePlayer;

  // Render clickable and nonClickable board.
  renderNonClickableBoard(newActivePlayer);
  renderClickableBoard(newActivePlayer === 'blue' ? 'org' : 'blue');
};

// screenAttack uses Users interaction to attack an specific cell on a specific board.
const screenAttack = (player, index) => {
  if (player === onMove) return; // To prevent players attacking their own board.

  let cords = [];

  cords[0] = Math.floor(index / 10);
  cords[1] = index % 10;

  switch (player) {
    case 'org':
      game.orgBoard.receiveAttack(cords);
      break;
    case 'blue':
      game.blueBoard.receiveAttack(cords);
  }

  // Refresh or render boards again.
  switchPlayerBoards(player);
};

// screenAttack uses AI intelligence to attack an specific cell on a specific board.
const screenAiAttack = (player) => {
  if (player === onMove) return; // To prevent players attacking their own board.

  const index = aiAttackBoard(); // Returns random valid board index (without duplicates)

  let cords = [];

  cords[0] = Math.floor(index / 10);
  cords[1] = index % 10;

  switch (player) {
    case 'org':
      game.orgBoard.receiveAttack(cords);
      break;
    case 'blue':
      game.blueBoard.receiveAttack(cords);
  }

  // In player Vs Ai mode first user attacks and then switchPlayerBoards(player) function is invoked and it changes active player, but because this is Player vs Ai mode, we must prevent this by setting it back to normal.

  switchPlayerBoards(player);
  renderClickableBoard(player === 'org' ? 'blue' : 'org');
};

// checkGameWinConditions uses .gameWinner() method to determine if the game is over, if it is, then stops the game flow and shows the end-screen dialog.
const checkGameWinConditions = () => {
  let winner = game.gameWinner();

  // gameWinner() returns either 'blue' or 'org' if the game is over and false if not.

  if (winner !== false) {
    // Game is over

    // open finished game dialog

    UIEndScreenDialog(document.querySelector('[data-dialog-cont]'), winner);

    document
      .querySelector('[data-dialog-new-game-btn]')
      .addEventListener('click', DOMDialog.dialogNewGameBtnClickEventHandler);

    return true;
  }
};

export {
  screenGameControl,
  screenAttack,
  checkGameWinConditions,
  screenAiAttack,
};
