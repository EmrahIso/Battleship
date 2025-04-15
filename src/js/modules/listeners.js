import { DOMGameInfoFlowControl } from './handlers/DOMGameInfoFlowControl.js';

// Static Listeners

// After the pager is fully loaded, start-screen dialog should appear.

window.addEventListener('load', DOMGameInfoFlowControl.showStartScreenDialog);

// After all information is collected via forms (provided by different dialogs), the game starts.

// 'startgame' is custom event used for that.

// startGameWindowCustomEventHandler, custom eventHandler for custom event 'startgame'.

window.addEventListener(
  'startgame',
  DOMGameInfoFlowControl.startGameWindowCustomEventHandler,
);

// newGameBtnEl onClick should reload the page allowing users to restart the game.
DOMGameInfoFlowControl.newGameBtnEl.addEventListener('click', () =>
  location.reload(),
);
