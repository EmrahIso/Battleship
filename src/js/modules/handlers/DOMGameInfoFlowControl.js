// Controls order of shown components on the page that gathers info about game and stores it into gameInfo object

import {
  UIStartScreenDialog,
  UIPlayerVsAIDialog,
  UIPlayerVsPlayerDialog,
  UIPlaceOrangeShipsDialog,
  UIPlaceBlueShipsDialog,
} from '../UI/UIDialog.js';

import { DOMSelectDropdown } from './DOMSelectDropdown.js';

import { DOMDialog } from './DOMDialog.js';

import { screenGameControl } from '../screenGameControl.js';

import { DOMBoard } from './DOMBoard.js';

const DOMGameInfoFlowControl = (function () {
  const gameInfo = {
    mode: null, // pvp / pvai
    playsFirst: null, // org / blue
    aiDifficulty: null, // easy / medium / hard
    boardOrg: null,
    boardBlue: null,
  };

  const dialogContEl = document.querySelector('[data-dialog-cont]');

  const newGameBtnEl = document.querySelector('[data-new-game-btn]');

  let startScreenFormEl;

  // First function that shows start screen dialog.

  const showStartScreenDialog = () => {
    UIStartScreenDialog(dialogContEl);
    const startScreenDialogEl = document.querySelector('[data-dialog-ss]');
    startScreenDialogEl.showModal();

    startScreenFormEl = startScreenDialogEl.querySelector('[data-form]');

    startScreenFormEl.addEventListener(
      'submit',
      startScreenFormSubmitEventHandler,
    );

    gatherGameInfoObserver.observe(document.querySelector('[data-body-grid]'), {
      childList: true,
      attributes: false,
      characterData: false,
      subtree: true,
    });
  };

  // Handler for submit event on start screen form.
  // Opens either showPlayerVsAIDialog() or showPlayerVsPlayerDialog() based on user input.

  const startScreenFormSubmitEventHandler = (e) => {
    e.preventDefault();

    const allRadioInputElNodeList = startScreenFormEl.querySelectorAll(
      'input[type="radio"][name="mode"]',
    );

    let isValid = false;
    let value;

    allRadioInputElNodeList.forEach((input) => {
      if (input.checked) {
        isValid = true;
        value = input.value;
      }
    });

    if (isValid) {
      document.querySelector('[data-dialog-ss]').close(); // Close the start screen dialog
      dialogContEl.querySelector('[data-dialog-ss]').replaceChildren();
      dialogContEl.querySelector('[data-dialog-ss]').remove();

      switch (value) {
        case 'p-v-ai':
          gameInfo.mode = 'pvai';
          showPlayerVsAIDialog(); // open player vs ai modal
          break;
        case 'p-v-p':
          gameInfo.mode = 'pvp';
          showPlayerVsPlayerDialog(); // open player vs player modal
          break;
      }
    }
  };

  let playerVsAIFormEl;

  // Function that shows showPlayerVsAi dialog.
  const showPlayerVsAIDialog = () => {
    UIPlayerVsAIDialog(dialogContEl); // Create player vs ai dialog
    document.querySelector('[data-dialog-pvai]').showModal();

    playerVsAIFormEl = document.querySelector('[data-dialog-pvai] [data-form]');

    playerVsAIFormEl.addEventListener(
      'submit',
      playerVsAIFormSubmitEventHandler,
    );

    // Enable select dropdown list to behave like HTML <select> element

    document
      .querySelector('[data-select-dropdown-open-btn]')
      .addEventListener(
        'click',
        DOMSelectDropdown.openDropdownBtnElClickEventHandler,
      );

    document
      .querySelector('[data-select-dropdown]')
      .addEventListener(
        'click',
        DOMSelectDropdown.autoCloseSelectDropdownElClickEventHandler,
      );

    document
      .querySelector('[data-select-dropdown]')
      .addEventListener(
        'keydown',
        DOMSelectDropdown.autoCloseSelectDropdownElKeydownEventHandler,
      );

    document
      .querySelector('[data-select-dropdown]')
      .addEventListener(
        'keyup',
        DOMSelectDropdown.keyboardSupportForSelectDropdownElKeyupEventHandler,
      );
  };

  // Handler for submit event on showPlayerVsAi form.
  // Opens placeShips dialogs.
  const playerVsAIFormSubmitEventHandler = (e) => {
    e.preventDefault();

    const allRadioInputElNodeList = playerVsAIFormEl.querySelectorAll(
      'input[type="radio"][name="plays-first-pvai"]',
    );

    let isRadioValid = false;
    let valueRadio;

    allRadioInputElNodeList.forEach((input) => {
      if (input.checked) {
        isRadioValid = true;
        valueRadio = input.value;
      }
    });

    const selectDropdownEl = document.querySelector('[data-select-dropdown');
    const selectDropdownValue = selectDropdownEl
      .querySelector('[data-select-dropdown-display-value]')
      .textContent.toLowerCase();

    const allowedValues = ['easy', 'medium', 'hard'];

    let isDropdownValid = false;
    let dropdownValue;

    if (allowedValues.includes(selectDropdownValue)) {
      isDropdownValid = true;
      dropdownValue = selectDropdownValue;
    }

    if (isRadioValid && isDropdownValid) {
      gameInfo.aiDifficulty = dropdownValue;
      dialogContEl.querySelector('[data-dialog-pvai]').close(); // Close player vs ai modal
      dialogContEl.querySelector('[data-dialog-pvai]').replaceChildren();
      dialogContEl.querySelector('[data-dialog-pvai]').remove();
      switch (valueRadio) {
        case 'org':
          showPlaceBlueShipsDialog(); // open place orange ships dialog

          // Open a dialog controlled by the computer (because we need those dom elements to randomly place ships using the placeComputerBoardShips function). Make it invisible because we don't want the user to have visual access to the computer-controlled gameBoard.
          document.querySelector('[data-dialog-place-blue]').style.opacity =
            '0';
          document.querySelector(
            '[data-dialog-place-blue]',
          ).style.pointerEvents = 'none';

          // Place computer ships
          gameInfo.boardBlue = placeComputerBoardShips(
            'blue',
            document.querySelector('[data-dialog-place-blue] [data-ship-cont]'),
          );

          showPlaceOrangeShipsDialog(); // open place blue ships dialog

          gameInfo.playsFirst = valueRadio;
          break;
        case 'blue':
          showPlaceOrangeShipsDialog(); // open place blue ships dialog

          // Open a dialog controlled by the computer (because we need those dom elements to randomly place ships using the placeComputerBoardShips function). Make it invisible because we don't want the user to have visual access to the computer-controlled gameBoard.
          document.querySelector('[data-dialog-place-org]').style.opacity = '0';
          document.querySelector(
            '[data-dialog-place-org]',
          ).style.pointerEvents = 'none';

          // Place computer ships
          gameInfo.boardOrg = placeComputerBoardShips(
            'org',
            document.querySelector('[data-dialog-place-org] [data-ship-cont]'),
          );

          showPlaceBlueShipsDialog(); // open place orange ships dialog

          gameInfo.playsFirst = valueRadio;
          break;
      }
    }
  };

  let playerVsPlayerFormEl;

  // Function that shows showPlayerVsPlayer dialog.
  const showPlayerVsPlayerDialog = () => {
    UIPlayerVsPlayerDialog(dialogContEl); // Create player vs ai dialog
    document.querySelector('[data-dialog-pvp]').showModal();

    playerVsPlayerFormEl = document.querySelector(
      '[data-dialog-pvp] [data-form]',
    );

    playerVsPlayerFormEl.addEventListener(
      'submit',
      playerVsPlayerFormSubmitEventHandler,
    );
  };

  // Handler for submit event on showPlayerVsPlayer form.
  // Opens placeShips dialogs.
  const playerVsPlayerFormSubmitEventHandler = (e) => {
    e.preventDefault();

    const allRadioInputElNodeList = playerVsPlayerFormEl.querySelectorAll(
      'input[type="radio"][name="plays-first-pvp"]',
    );

    let isRadioValid = false;
    let valueRadio;

    allRadioInputElNodeList.forEach((input) => {
      if (input.checked) {
        isRadioValid = true;
        valueRadio = input.value;
      }
    });

    if (isRadioValid) {
      dialogContEl.querySelector('[data-dialog-pvp]').close(); // Close player vs player modal
      dialogContEl.querySelector('[data-dialog-pvp]').replaceChildren();
      dialogContEl.querySelector('[data-dialog-pvp]').remove();
      switch (valueRadio) {
        case 'org':
          showPlaceBlueShipsDialog(); // open place orange ships dialog
          showPlaceOrangeShipsDialog(); // open place blue ships dialog
          gameInfo.playsFirst = valueRadio;
          break;
        case 'blue':
          showPlaceOrangeShipsDialog(); // open place blue ships dialog
          showPlaceBlueShipsDialog(); // open place orange ships dialog
          gameInfo.playsFirst = valueRadio;
          break;
      }
    }
  };

  let placeOrangeShipsFormEl;

  // Function that shows placeOrangeShips dialog.
  const showPlaceOrangeShipsDialog = () => {
    UIPlaceOrangeShipsDialog(dialogContEl); // Create place orange ships dialog
    document.querySelector('[data-dialog-place-org]').showModal();

    placeOrangeShipsFormEl = document.querySelector(
      '[data-dialog-place-org] [data-form]',
    );

    placeOrangeShipsFormEl.addEventListener(
      'submit',
      placeOrangeShipsFormElSubmitEventHandler,
    );

    // Rotate ships

    document
      .querySelector('[data-ship-rotate="org"]')
      .addEventListener(
        'click',
        DOMDialog.dialogPlaceShipsGameBoardRotateShipsBtnElClickEventHandler,
      );

    DOMBoard.dragAndDropShips('org');
  };

  // Handler for submit event on placeOrangeShips form.
  // Opens placeShips dialogs.
  const placeOrangeShipsFormElSubmitEventHandler = (e) => {
    e.preventDefault();

    let isValid = true;

    const shipContEl = document.querySelector('[data-ship-org-cont]');

    const allShips = Array.from(shipContEl.querySelectorAll('[data-ship-org]'));

    allShips.forEach((ship) => {
      if (ship.getAttribute('data-ship-used') !== '') isValid = false;
    });

    if (isValid) {
      const gameBoardEl = document.querySelector(
        '[data-dialog-place-org] [data-place-game-board-org]',
      );

      const gameBoardCellElNodeList =
        gameBoardEl.querySelectorAll('[data-cell]');

      const board = [];

      gameBoardCellElNodeList.forEach((cell) => {
        switch (cell.classList[3]) {
          case 'marked--patrol':
            board.push(1);
            break;
          case 'marked--submarine':
            board.push(2);
            break;
          case 'marked--destroyer':
            board.push(3);
            break;
          case 'marked--battleship':
            board.push(4);
            break;
          case 'marked--carrier':
            board.push(5);
            break;
          default:
            board.push(0);
        }
      });

      gameInfo.boardOrg = board;

      document.querySelector('[data-dialog-place-org]').close();
      dialogContEl.querySelector('[data-dialog-place-org]').replaceChildren();
      dialogContEl.querySelector('[data-dialog-place-org]').remove();
    }
  };

  let placeBlueShipsFormEl;

  // Function that shows placeBlueShips dialog.
  const showPlaceBlueShipsDialog = () => {
    UIPlaceBlueShipsDialog(dialogContEl); // Create place orange ships dialog
    document.querySelector('[data-dialog-place-blue]').showModal();

    placeBlueShipsFormEl = document.querySelector(
      '[data-dialog-place-blue] [data-form]',
    );

    placeBlueShipsFormEl.addEventListener(
      'submit',
      placeBlueShipsFormElSubmitEventHandler,
    );

    document
      .querySelector('[data-ship-rotate="blue"]')
      .addEventListener(
        'click',
        DOMDialog.dialogPlaceShipsGameBoardRotateShipsBtnElClickEventHandler,
      );

    DOMBoard.dragAndDropShips('blue');
  };

  // Handler for submit event on placeBlueShips form.
  // Opens placeShips dialogs.
  const placeBlueShipsFormElSubmitEventHandler = (e) => {
    e.preventDefault();

    let isValid = true;

    if (isValid) {
      const gameBoardEl = document.querySelector(
        '[data-dialog-place-blue] [data-place-game-board-blue]',
      );

      const gameBoardCellElNodeList =
        gameBoardEl.querySelectorAll('.gameboard__cell');

      const board = [];

      gameBoardCellElNodeList.forEach((cell) => {
        switch (cell.classList[3]) {
          case 'marked--patrol':
            board.push(1);
            break;
          case 'marked--submarine':
            board.push(2);
            break;
          case 'marked--destroyer':
            board.push(3);
            break;
          case 'marked--battleship':
            board.push(4);
            break;
          case 'marked--carrier':
            board.push(5);
            break;
          default:
            board.push(0);
        }
      });

      gameInfo.boardBlue = board;

      document.querySelector('[data-dialog-place-blue]').close();
      dialogContEl.querySelector('[data-dialog-place-blue]').replaceChildren();
      dialogContEl.querySelector('[data-dialog-place-blue]').remove();
    }
  };

  // Function that places all computer (AI) ships in Player vs AI mode.
  const placeComputerBoardShips = (player, shipsCont) => {
    const allShips = Array.from(shipsCont.querySelectorAll('[data-ship]'));

    const currentBoard = dialogContEl.querySelector(
      `[data-dialog-place-${player}] [data-place-game-board]`,
    );

    const boardCopy = [];

    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        boardCopy.push(0);
      }
    }

    allShips.forEach((ship, index) => {
      const shipCoords = DOMBoard.addShipComputer(
        player,
        currentBoard,
        ship.getAttribute('data-ship-length'),
        index,
      );

      shipCoords.forEach((shipCoord) => {
        boardCopy[shipCoord - 1] = index + 1;
      });
    });

    return boardCopy;
  };

  // Mutation Observer => gather Information about game

  // isFinishedGatherGameInfoObserver Mutation observer and the custom 'startgame' event are used to determine when all the information needed to start the game has been gathered.
  // Once we have gathered all information we run screenGameControl() which starts the game.

  // How it works:

  // HTML skeleton has a div element with the data-dialog-cont attribute (referred to as dialogContEl) in which dialog components are added dynamically through JS from page loading, which are used to collect information for the game. When all the necessary dialog forms are submitted, that container element will not have child nodes, and then the collection of information is finished and the game can begin.

  // That's why this mutation observer is just waiting for the moment when this container element has 0 child elements (not taking into account the start of loading the page because this observer has not yet loaded at that moment).

  const isFinishedGatherGameInfoObserver = () => {
    if (Array.from(dialogContEl.childNodes).length === 0) {
      window.dispatchEvent(startGameCustomEvent);
    }
  };

  console.log(myVar);

  let gatherGameInfoObserver = new MutationObserver(
    isFinishedGatherGameInfoObserver,
  );

  let startGameCustomEvent = new CustomEvent('startgame');

  const startGameWindowCustomEventHandler = (e) => {
    screenGameControl(gameInfo);
  };

  return {
    gameInfo,
    newGameBtnEl,
    showStartScreenDialog,
    startScreenFormEl,
    startScreenFormSubmitEventHandler,
    playerVsAIFormEl,
    playerVsAIFormSubmitEventHandler,
    playerVsPlayerFormEl,
    playerVsPlayerFormSubmitEventHandler,
    placeOrangeShipsFormEl,
    placeOrangeShipsFormElSubmitEventHandler,
    placeBlueShipsFormEl,
    placeBlueShipsFormElSubmitEventHandler,
    startGameCustomEvent,
    startGameWindowCustomEventHandler,
  };
})();

export { DOMGameInfoFlowControl };
