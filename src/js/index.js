import '../scss/main.scss';
import './modules/listeners.js';

// Code logic description:

// After the complete page is loaded, the start screen dialog is displayed, followed by all other necessary dialogs (created via JS).
// | handlers/DOMGameInfoFlowControl.js, listeners.js |

// Dialogs are placed in the dialog container element and serve to collect information about players for the start of the game.
// | UI/UIDialog.js, handlers/DOMDialog.js |

// After all the information has been collected (how we know when it was collected in more detail at handlers/DOMGameInfoFlowControl.js from lines 463 to 472), the screenGameControl function is started, which takes complete control of the game, logically and through the UI, creating the gameBoard and other details.
// | screenGameControl.js, logic/aiLogic.js, logic/gameControl.js, handlers/DOMBoard.js, handlers/DOMScreenGameFlowControl.js |

// The game is over after one of the players wins, and at that moment an end screen dialog is displayed that allows users to start the game from the beginning.

// To make sure that we are in development mode
if (process.env.NODE_ENV !== 'production') {
  console.log('----------------------');
  console.log('Looks like we are in development mode!');
  console.log('----------------------');
}
