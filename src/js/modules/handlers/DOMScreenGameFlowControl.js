// This module starts game when all forms are submitted and stores all handlers for screenGameControl.

import {
  screenAttack,
  checkGameWinConditions,
  screenAiAttack,
} from '../screenGameControl.js';

const DOMScreenGameFlowControl = (function () {
  // Handler when a player clicks (attacks) some specific point in Player vs Player mode.
  const boardCellPVPClickEventHandler = (e) => {
    let isTargetCell = e.target.getAttribute('data-cell') === '' ? true : false;

    if (!isTargetCell) return;

    // Check if game is already over

    let condition = checkGameWinConditions();

    if (condition) return;

    const cellIndex = Number(e.target.id) - 1;

    const playerBoardEl = e.target.closest('[data-game-board]');
    const player = playerBoardEl.classList[1].includes('org') ? 'org' : 'blue';

    screenAttack(player, cellIndex);

    // Check if game is over after this move

    condition = checkGameWinConditions();

    if (condition) return;
  };

  // Handler when a player clicks (attacks) some specific point in Player vs AI mode.
  const boardCellPVAiClickEventHandler = (e) => {
    let isTargetCell = e.target.getAttribute('data-cell') === '' ? true : false;

    if (!isTargetCell) return;

    // Check if game is already over

    let condition = checkGameWinConditions();

    if (condition) return;

    const cellIndex = Number(e.target.id) - 1;

    const playerBoardEl = e.target.closest('[data-game-board]');
    const player = playerBoardEl.classList[1].includes('org') ? 'org' : 'blue';

    screenAttack(player, cellIndex);

    // Check if game is over after this players move

    condition = checkGameWinConditions();

    if (condition) return;

    // AI attacks

    screenAiAttack(player === 'org' ? 'blue' : 'org');

    // Check if game is over after this AI move

    condition = checkGameWinConditions();

    if (condition) return;
  };

  return {
    boardCellPVPClickEventHandler,
    boardCellPVAiClickEventHandler,
  };
})();

export { DOMScreenGameFlowControl };
