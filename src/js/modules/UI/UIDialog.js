// Create Dialog JS component and all modifiers.

import { UICreateSelectDropdown } from './UISelectDropdown.js';
import { UICreateBoard } from './UIBoard.js';

import logoIcon from '../../../../assets/images/logo-icon.svg';
import humanIcon from '../../../../assets/images/human-icon.svg';
import aiIcon from '../../../../assets/images/ai-icon.svg';
import shipIcon from '../../../../assets/images/ship-icon.svg';
import rotateIcon from '../../../../assets/images/rotate.svg';

function UICreateDialogTemplate(parentEl) {
  const dialog = document.createElement('dialog');
  dialog.classList.add('dialog');
  dialog.setAttribute('data-dialog', '');
  parentEl.appendChild(dialog);

  const dialogHeading = document.createElement('h1');
  dialogHeading.classList.add('logo');
  dialog.appendChild(dialogHeading);

  for (let i = 1; i <= 2; i++) {
    const dialogHeadingIconCont = document.createElement('span');
    dialogHeadingIconCont.classList.add('logo__icon-cont');
    dialogHeading.appendChild(dialogHeadingIconCont);

    const dialogHeadingIcon = document.createElement('img');
    dialogHeadingIcon.src = logoIcon;
    dialogHeadingIcon.alt = 'logo-icon';
    dialogHeadingIcon.classList.add('logo__icon');
    dialogHeadingIconCont.appendChild(dialogHeadingIcon);
  }

  const dialogHeadingLink = document.createElement('a');
  dialogHeadingLink.href = '#';
  dialogHeadingLink.classList.add('logo__link');
  dialogHeadingLink.textContent = 'BattleShip';
  dialogHeading.appendChild(dialogHeadingLink);

  return dialog;
}

function UIStartScreenDialog(parentEl) {
  const dialog = UICreateDialogTemplate(parentEl);

  dialog.classList.add('dialog', 'dialog--start-screen');
  dialog.setAttribute('data-dialog-ss', '');

  const dialogContent = document.createElement('div');
  dialogContent.classList.add('dialog__content-box');
  dialog.appendChild(dialogContent);

  const dialogContentHeading = document.createElement('h2');
  dialogContentHeading.textContent = 'New Game';
  dialogContentHeading.classList.add('dialog__heading');
  dialogContent.appendChild(dialogContentHeading);

  const dialogForm = document.createElement('form');
  dialogForm.action = '#';
  dialogForm.classList.add('form');
  dialogForm.setAttribute('data-form', '');
  dialogForm.setAttribute('novalidate', '');
  dialogContent.appendChild(dialogForm);

  const dialogFieldset = document.createElement('fieldset');
  dialogFieldset.classList.add('form__fieldset');
  dialogForm.appendChild(dialogFieldset);

  const dialogFieldsetLegend = document.createElement('legend');
  dialogFieldsetLegend.classList.add('dialog__description');
  dialogFieldsetLegend.textContent = 'Choose one of the two game modes offered';
  dialogFieldset.appendChild(dialogFieldsetLegend);

  const dialogList = document.createElement('ul');
  dialogList.classList.add('form__list');
  dialogForm.appendChild(dialogList);

  const listItem1 = document.createElement('li');
  dialogList.appendChild(listItem1);

  const listInput1 = document.createElement('input');
  listInput1.type = 'radio';
  listInput1.id = 'gamemode-p-v-p';
  listInput1.value = 'p-v-p';
  listInput1.name = 'mode';
  listInput1.classList.add('form__mode-radio');
  listInput1.setAttribute('required', '');
  listItem1.appendChild(listInput1);

  const listLabel1 = document.createElement('label');
  listLabel1.setAttribute('for', 'gamemode-p-v-p');
  listItem1.appendChild(listLabel1);

  const listLabelSpan1 = document.createElement('span');
  listLabelSpan1.textContent = 'Player vs Player';
  listLabel1.appendChild(listLabelSpan1);

  const listHumanIcon1 = document.createElement('img');
  listHumanIcon1.alt = 'human icon';
  listHumanIcon1.src = humanIcon;
  listHumanIcon1.classList.add('form__mode-radio-icon');
  listLabel1.appendChild(listHumanIcon1);

  const listScoreDash1 = document.createElement('strong');
  listScoreDash1.textContent = '-';
  listLabel1.appendChild(listScoreDash1);

  const listAiIcon1 = document.createElement('img');
  listHumanIcon1.alt = 'ai icon';
  listAiIcon1.src = aiIcon;
  listAiIcon1.classList.add('form__mode-radio-icon');
  listLabel1.appendChild(listAiIcon1);

  const listItem2 = document.createElement('li');
  dialogList.appendChild(listItem2);

  const listInput2 = document.createElement('input');
  listInput2.type = 'radio';
  listInput2.id = 'gamemode-p-v-ai';
  listInput2.value = 'p-v-ai';
  listInput2.name = 'mode';
  listInput2.classList.add('form__mode-radio');
  listInput2.setAttribute('required', '');
  listItem2.appendChild(listInput2);

  const listLabel2 = document.createElement('label');
  listLabel2.setAttribute('for', 'gamemode-p-v-ai');
  listItem2.appendChild(listLabel2);

  const listLabelSpan2 = document.createElement('span');
  listLabelSpan2.textContent = 'Player vs AI';
  listLabel2.appendChild(listLabelSpan2);

  const listHumanIcon2 = document.createElement('img');
  listHumanIcon2.alt = 'human icon';
  listHumanIcon2.src = humanIcon;
  listHumanIcon2.classList.add('form__mode-radio-icon');
  listLabel2.appendChild(listHumanIcon2);

  const listScoreDash2 = document.createElement('strong');
  listScoreDash2.textContent = '-';
  listLabel2.appendChild(listScoreDash2);

  const listAiIcon2 = document.createElement('img');
  listHumanIcon2.alt = 'ai icon';
  listAiIcon2.src = aiIcon;
  listAiIcon2.classList.add('form__mode-radio-icon');
  listLabel2.appendChild(listAiIcon2);

  const dialogFormSubmitBtn = document.createElement('button');
  dialogFormSubmitBtn.type = 'submit';
  dialogFormSubmitBtn.setAttribute('autofocus', '');
  dialogFormSubmitBtn.classList.add('button', 'button--submit');
  dialogFormSubmitBtn.textContent = 'Next';
  dialogForm.appendChild(dialogFormSubmitBtn);
}

function UIPlayerVsAIDialog(parentEl) {
  const dialog = UICreateDialogTemplate(parentEl);

  dialog.classList.add('dialog', 'dialog--pvai');
  dialog.setAttribute('data-dialog-pvai', '');

  const dialogContent = document.createElement('div');
  dialogContent.classList.add('dialog__content-box');
  dialog.appendChild(dialogContent);

  const dialogContentHeading = document.createElement('h2');
  dialogContentHeading.textContent = 'Match Details';
  dialogContentHeading.classList.add('dialog__heading');
  dialogContent.appendChild(dialogContentHeading);

  const dialogContentDescription = document.createElement('p');
  dialogContentDescription.classList.add('dialog__description');
  dialogContentDescription.textContent =
    'Choose AI Difficulty against which you wanna play';
  dialogContent.appendChild(dialogContentDescription);

  const dialogForm = document.createElement('form');
  dialogForm.action = '#';
  dialogForm.classList.add('form');
  dialogForm.setAttribute('data-form', '');
  dialogForm.setAttribute('novalidate', '');
  dialogContent.appendChild(dialogForm);

  const dialogFormSelectDropdown = UICreateSelectDropdown(dialogForm);
  dialogForm.appendChild(dialogFormSelectDropdown);

  const dialogFieldset = document.createElement('fieldset');
  dialogFieldset.classList.add('form__fieldset');
  dialogForm.appendChild(dialogFieldset);

  const dialogFieldsetLegend = document.createElement('legend');
  dialogFieldsetLegend.classList.add('dialog__description');
  dialogFieldsetLegend.textContent =
    'Choose which player / fleet will you play';
  dialogFieldset.appendChild(dialogFieldsetLegend);

  const dialogList = document.createElement('ul');
  dialogList.classList.add('form__list');
  dialogFieldset.appendChild(dialogList);

  const listItem1 = document.createElement('li');
  dialogList.appendChild(listItem1);

  const listInput1 = document.createElement('input');
  listInput1.type = 'radio';
  listInput1.id = 'first-org-pvai';
  listInput1.value = 'org';
  listInput1.name = 'plays-first-pvai';
  listInput1.classList.add('form__mode-radio', 'form__mode-radio--org');
  listItem1.appendChild(listInput1);

  const listLabel1 = document.createElement('label');
  listLabel1.setAttribute('for', 'first-org-pvai');
  listItem1.appendChild(listLabel1);

  const listLabelSpan1 = document.createElement('span');
  listLabelSpan1.textContent = 'Orange Fleet';
  listLabel1.appendChild(listLabelSpan1);

  const listShipIcon1 = document.createElement('img');
  listShipIcon1.alt = 'fleet icon';
  listShipIcon1.src = shipIcon;
  listShipIcon1.classList.add(
    'form__mode-radio-icon',
    'form__mode-radio-icon--org',
  );
  listLabel1.appendChild(listShipIcon1);

  const listItem2 = document.createElement('li');
  dialogList.appendChild(listItem2);

  const listInput2 = document.createElement('input');
  listInput2.type = 'radio';
  listInput2.id = 'first-blue-pvai';
  listInput2.value = 'blue';
  listInput2.name = 'plays-first-pvai';
  listInput2.classList.add('form__mode-radio', 'form__mode-radio--blue');
  listItem2.appendChild(listInput2);

  const listLabel2 = document.createElement('label');
  listLabel2.setAttribute('for', 'first-blue-pvai');
  listItem2.appendChild(listLabel2);

  const listLabelSpan2 = document.createElement('span');
  listLabelSpan2.textContent = 'Blue Fleet';
  listLabel2.appendChild(listLabelSpan2);

  const listShipIcon2 = document.createElement('img');
  listShipIcon2.alt = 'fleet icon';
  listShipIcon2.src = shipIcon;
  listShipIcon2.classList.add(
    'form__mode-radio-icon',
    'form__mode-radio-icon--blue',
  );
  listLabel2.appendChild(listShipIcon2);

  const dialogFormSubmitBtn = document.createElement('button');
  dialogFormSubmitBtn.type = 'submit';
  dialogFormSubmitBtn.setAttribute('autofocus', '');
  dialogFormSubmitBtn.classList.add('button', 'button--submit');
  dialogFormSubmitBtn.textContent = 'Next';
  dialogForm.appendChild(dialogFormSubmitBtn);
}

function UIPlayerVsPlayerDialog(parentEl) {
  const dialog = UICreateDialogTemplate(parentEl);

  dialog.classList.add('dialog', 'dialog--pvp');
  dialog.setAttribute('data-dialog-pvp', '');

  const dialogContent = document.createElement('div');
  dialogContent.classList.add('dialog__content-box');
  dialog.appendChild(dialogContent);

  const dialogContentHeading = document.createElement('h2');
  dialogContentHeading.textContent = 'Match Details';
  dialogContentHeading.classList.add('dialog__heading');
  dialogContent.appendChild(dialogContentHeading);

  const dialogForm = document.createElement('form');
  dialogForm.action = '#';
  dialogForm.classList.add('form');
  dialogForm.setAttribute('data-form', '');
  dialogForm.setAttribute('novalidate', '');
  dialogContent.appendChild(dialogForm);

  const dialogFieldset = document.createElement('fieldset');
  dialogFieldset.classList.add('form__fieldset');
  dialogForm.appendChild(dialogFieldset);

  const dialogFieldsetLegend = document.createElement('legend');
  dialogFieldsetLegend.classList.add('dialog__description');
  dialogFieldsetLegend.textContent =
    'Choose which player / fleet will play first';
  dialogFieldset.appendChild(dialogFieldsetLegend);

  const dialogList = document.createElement('ul');
  dialogList.classList.add('form__list');
  dialogFieldset.appendChild(dialogList);

  const listItem1 = document.createElement('li');
  dialogList.appendChild(listItem1);

  const listInput1 = document.createElement('input');
  listInput1.type = 'radio';
  listInput1.id = 'first-org-pvp';
  listInput1.value = 'org';
  listInput1.name = 'plays-first-pvp';
  listInput1.classList.add('form__mode-radio', 'form__mode-radio--org');
  listItem1.appendChild(listInput1);

  const listLabel1 = document.createElement('label');
  listLabel1.setAttribute('for', 'first-org-pvp');
  listItem1.appendChild(listLabel1);

  const listLabelSpan1 = document.createElement('span');
  listLabelSpan1.textContent = 'Orange Fleet';
  listLabel1.appendChild(listLabelSpan1);

  const listShipIcon1 = document.createElement('img');
  listShipIcon1.alt = 'fleet icon';
  listShipIcon1.src = shipIcon;
  listShipIcon1.classList.add(
    'form__mode-radio-icon',
    'form__mode-radio-icon--org',
  );
  listLabel1.appendChild(listShipIcon1);

  const listItem2 = document.createElement('li');
  dialogList.appendChild(listItem2);

  const listInput2 = document.createElement('input');
  listInput2.type = 'radio';
  listInput2.id = 'first-blue-pvp';
  listInput2.value = 'blue';
  listInput2.name = 'plays-first-pvp';
  listInput2.classList.add('form__mode-radio', 'form__mode-radio--blue');
  listItem2.appendChild(listInput2);

  const listLabel2 = document.createElement('label');
  listLabel2.setAttribute('for', 'first-blue-pvp');
  listItem2.appendChild(listLabel2);

  const listLabelSpan2 = document.createElement('span');
  listLabelSpan2.textContent = 'Blue Fleet';
  listLabel2.appendChild(listLabelSpan2);

  const listShipIcon2 = document.createElement('img');
  listShipIcon2.alt = 'fleet icon';
  listShipIcon2.src = shipIcon;
  listShipIcon2.classList.add(
    'form__mode-radio-icon',
    'form__mode-radio-icon--blue',
  );
  listLabel2.appendChild(listShipIcon2);

  const dialogFormSubmitBtn = document.createElement('button');
  dialogFormSubmitBtn.type = 'submit';
  dialogFormSubmitBtn.setAttribute('autofocus', '');
  dialogFormSubmitBtn.classList.add('button', 'button--submit');
  dialogFormSubmitBtn.textContent = 'Next';
  dialogForm.appendChild(dialogFormSubmitBtn);
}

function UIPlaceOrangeShipsDialog(parentEl) {
  const dialog = UICreateDialogTemplate(parentEl);

  dialog.classList.add('dialog', 'dialog--place', 'dialog--place-org');
  dialog.setAttribute('data-dialog-place', '');
  dialog.setAttribute('data-dialog-place-org', '');

  const dialogContent = document.createElement('div');
  dialogContent.classList.add('dialog__content-box');
  dialog.appendChild(dialogContent);

  const dialogContentHeading = document.createElement('h2');
  dialogContentHeading.textContent = 'Place Ships';
  dialogContentHeading.classList.add('dialog__heading');
  dialogContent.appendChild(dialogContentHeading);

  const dialogContentDescription = document.createElement('p');
  dialogContentDescription.classList.add(
    'dialog__description',
    'dialog__description--small',
  );
  dialogContentDescription.innerHTML =
    '<strong>Drag and drop</strong> the lined up ships to the places you want. Click on the ship and the <strong>rotate</strong> button to <strong>rotate</strong>';
  dialogContent.appendChild(dialogContentDescription);

  const dialogForm = document.createElement('form');
  dialogForm.action = '#';
  dialogForm.classList.add('form');
  dialogForm.setAttribute('data-form', '');
  dialogForm.setAttribute('novalidate', '');
  dialogContent.appendChild(dialogForm);

  const dialogFormBtnsCont = document.createElement('div');
  dialogFormBtnsCont.classList.add('form__button-cont');
  dialogForm.appendChild(dialogFormBtnsCont);

  const dialogFormRotateBtn = document.createElement('button');
  dialogFormRotateBtn.type = 'button';
  dialogFormRotateBtn.setAttribute('data-ship-rotate', 'org');
  dialogFormRotateBtn.classList.add(
    'button',
    'button--rotate',
    'button--rotate-org',
  );
  dialogFormBtnsCont.appendChild(dialogFormRotateBtn);

  const dialogFormRotateBtnIcon = document.createElement('img');
  dialogFormRotateBtnIcon.src = rotateIcon;
  dialogFormRotateBtnIcon.alt = 'rotate icon';
  dialogFormRotateBtnIcon.classList.add('button__icon', 'button__icon--org');
  dialogFormRotateBtn.appendChild(dialogFormRotateBtnIcon);

  const dialogFormSubmitBtn = document.createElement('button');
  dialogFormSubmitBtn.type = 'submit';
  dialogFormSubmitBtn.setAttribute('autofocus', '');
  dialogFormSubmitBtn.classList.add('button', 'button--submit');
  dialogFormSubmitBtn.textContent = 'Next';
  dialogFormBtnsCont.appendChild(dialogFormSubmitBtn);

  const dialogGameBoardShipCont = document.createElement('div');
  dialogGameBoardShipCont.classList.add('gameboard__ship-cont');
  dialogGameBoardShipCont.setAttribute('data-ship-org-cont', '');
  dialogGameBoardShipCont.setAttribute('data-ship-cont', '');
  dialogContent.appendChild(dialogGameBoardShipCont);

  const shipNames = {
    1: 'Patrol',
    2: 'Submarine',
    3: 'Destroyer',
    4: 'Battleship',
    5: 'Carrier',
  };

  for (let i = 1; i <= 5; i++) {
    // We need the index variable code to know which class should have which integer ship length since we have two 3 cell ships.

    let index; // used only for HTML class and data attributes

    if (i > 3) {
      index = i;
    } else if (i < 3) {
      index = i + 1;
    } else {
      index = 3;
    }

    const ship = document.createElement('div');
    ship.classList.add(
      'gameboard__ship',
      'gameboard__ship--org',
      `gameboard__ship--${index}`,
      `gameboard__ship--${index}-${shipNames[i].toLowerCase()}`,
    );
    ship.setAttribute('data-ship', '');
    ship.setAttribute('data-ship-org', '');
    ship.setAttribute('data-ship-length', `${index}`);
    ship.setAttribute('data-ship-type', `${shipNames[i].toLowerCase()}`);
    ship.setAttribute('draggable', 'true');
    dialogGameBoardShipCont.appendChild(ship);
  }

  UICreateBoard(
    document.querySelector('[data-dialog-place-org] .dialog__content-box'),
    'org',
    true,
  );
}

function UIPlaceBlueShipsDialog(parentEl) {
  const dialog = UICreateDialogTemplate(parentEl);

  dialog.classList.add('dialog', 'dialog--place', 'dialog--place-blue');
  dialog.setAttribute('data-dialog-place', '');
  dialog.setAttribute('data-dialog-place-blue', '');

  const dialogContent = document.createElement('div');
  dialogContent.classList.add('dialog__content-box');
  dialog.appendChild(dialogContent);

  const dialogContentHeading = document.createElement('h2');
  dialogContentHeading.textContent = 'Place Ships';
  dialogContentHeading.classList.add('dialog__heading');
  dialogContent.appendChild(dialogContentHeading);

  const dialogContentDescription = document.createElement('p');
  dialogContentDescription.classList.add(
    'dialog__description',
    'dialog__description--small',
  );
  dialogContentDescription.innerHTML =
    '<strong>Drag and drop</strong> the lined up ships to the places you want. Click on the ship and the <strong>rotate</strong> button to <strong>rotate</strong>';
  dialogContent.appendChild(dialogContentDescription);

  const dialogForm = document.createElement('form');
  dialogForm.action = '#';
  dialogForm.classList.add('form');
  dialogForm.setAttribute('data-form', '');
  dialogForm.setAttribute('novalidate', '');
  dialogContent.appendChild(dialogForm);

  const dialogFormBtnsCont = document.createElement('div');
  dialogFormBtnsCont.classList.add('form__button-cont');
  dialogForm.appendChild(dialogFormBtnsCont);

  const dialogFormRotateBtn = document.createElement('button');
  dialogFormRotateBtn.type = 'button';
  dialogFormRotateBtn.setAttribute('data-ship-rotate', 'blue');
  dialogFormRotateBtn.classList.add(
    'button',
    'button--rotate',
    'button--rotate-blue',
  );
  dialogFormBtnsCont.appendChild(dialogFormRotateBtn);

  const dialogFormRotateBtnIcon = document.createElement('img');
  dialogFormRotateBtnIcon.src = rotateIcon;
  dialogFormRotateBtnIcon.alt = 'rotate icon';
  dialogFormRotateBtnIcon.classList.add('button__icon', 'button__icon--blue');
  dialogFormRotateBtn.appendChild(dialogFormRotateBtnIcon);

  const dialogFormSubmitBtn = document.createElement('button');
  dialogFormSubmitBtn.type = 'submit';
  dialogFormSubmitBtn.setAttribute('autofocus', '');
  dialogFormSubmitBtn.classList.add('button', 'button--submit');
  dialogFormSubmitBtn.textContent = 'Next';
  dialogFormBtnsCont.appendChild(dialogFormSubmitBtn);

  const dialogGameBoardShipCont = document.createElement('div');
  dialogGameBoardShipCont.classList.add('gameboard__ship-cont');
  dialogGameBoardShipCont.setAttribute('data-ship-blue-cont', '');
  dialogGameBoardShipCont.setAttribute('data-ship-cont', '');
  dialogContent.appendChild(dialogGameBoardShipCont);

  const shipNames = {
    1: 'Patrol',
    2: 'Submarine',
    3: 'Destroyer',
    4: 'Battleship',
    5: 'Carrier',
  };

  for (let i = 1; i <= 5; i++) {
    // We need the index variable code to know which class should have which integer ship length since we have two 3 cell ships.

    let index; // used only for HTML class and data attributes

    if (i > 3) {
      index = i;
    } else if (i < 3) {
      index = i + 1;
    } else {
      index = 3;
    }

    const ship = document.createElement('div');
    ship.classList.add(
      'gameboard__ship',
      'gameboard__ship--blue',
      `gameboard__ship--${index}`,
      `gameboard__ship--${index}-${shipNames[i].toLowerCase()}`,
    );
    ship.setAttribute('data-ship', '');
    ship.setAttribute('data-ship-blue', '');
    ship.setAttribute('data-ship-length', `${index}`);
    ship.setAttribute('data-ship-type', `${shipNames[i].toLowerCase()}`);
    ship.setAttribute('draggable', 'true');
    dialogGameBoardShipCont.appendChild(ship);
  }

  UICreateBoard(
    document.querySelector('[data-dialog-place-blue] .dialog__content-box'),
    'blue',
    true,
  );
}

export {
  UIStartScreenDialog,
  UIPlayerVsAIDialog,
  UIPlayerVsPlayerDialog,
  UIPlaceOrangeShipsDialog,
  UIPlaceBlueShipsDialog,
};
