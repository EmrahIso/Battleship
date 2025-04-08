import shipIcon from '../../../../assets/images/ship-icon.svg';

function UICreateBoard(parentEl, playerColor, isPlaceGameBoard) {
  const width = 10;
  const height = 10;

  if (isPlaceGameBoard) {
    const gameBoard = document.createElement('div');
    gameBoard.classList.add(
      'gameboard',
      `gameboard--${playerColor}`,
      'gameboard--place',
    );
    gameBoard.setAttribute('data-place-game-board', '');
    gameBoard.setAttribute(`data-place-game-board-${playerColor}`, '');

    parentEl.appendChild(gameBoard);
  } else {
    const gameBoardContainer = document.createElement('div');
    gameBoardContainer.classList.add(
      'gameboard__cont',
      `gameboard__cont--${playerColor}`,
    );

    parentEl.appendChild(gameBoardContainer);

    const gameBoardHeading = document.createElement('h2');
    gameBoardHeading.classList.add(
      'gameboard__heading',
      `gameboard__heading--${playerColor}`,
    );
    gameBoardContainer.appendChild(gameBoardHeading);

    const gameBoardHeadingIconCont = document.createElement('div');
    gameBoardHeadingIconCont.classList.add(
      'gameboard__heading-icon-cont',
      `gameboard__heading-icon-cont--${playerColor}`,
    );
    gameBoardHeading.appendChild(gameBoardHeadingIconCont);

    const gameBoardHeadingIcon = document.createElement('img');
    gameBoardHeadingIcon.src = shipIcon;
    gameBoardHeadingIcon.setAttribute('alt', 'icon');
    gameBoardHeadingIcon.classList.add(
      'gameboard__heading-icon',
      `gameboard__heading-icon--${playerColor}`,
    );
    gameBoardHeadingIconCont.appendChild(gameBoardHeadingIcon);

    const gameBoardHeadingSpan = document.createElement('span');
    gameBoardHeadingSpan.textContent = `${playerColor === 'org' ? 'Orange' : 'Blue'} Fleet`;
    gameBoardHeading.appendChild(gameBoardHeadingSpan);

    const gameBoard = document.createElement('div');
    gameBoard.classList.add('gameboard', `gameboard--${playerColor}`);
    gameBoard.setAttribute('data-game-board', '');
    gameBoard.setAttribute(`data-game-board-${playerColor}`, '');
    gameBoardContainer.appendChild(gameBoard);
  }

  let cellIndex = 0;
  for (let i = 1; i <= width; i++) {
    for (let j = 1; j <= height; j++) {
      cellIndex++;

      const cell = document.createElement('div');
      cell.classList.add('gameboard__cell', `gameboard__cell--${cellIndex}`);
      cell.setAttribute('data-cell', '');
      cell.setAttribute(`data-cell-${cellIndex}`, '');
      cell.setAttribute('id', `${cellIndex}`);

      if (isPlaceGameBoard) {
        document
          .querySelector(`[data-place-game-board-${playerColor}]`)
          .appendChild(cell);
      } else {
        document
          .querySelector(`[data-game-board-${playerColor}]`)
          .appendChild(cell);
      }

      const cellPoint = document.createElement('span');
      cellPoint.classList.add('gameboard__cell-point');
      cellPoint.style.pointerEvents = 'none';
      cell.appendChild(cellPoint);
    }
  }
}

export { UICreateBoard };
