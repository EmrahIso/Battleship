// Module that stores handlers for Dialog components.

const DOMDialog = (function () {
  let shipAngleOrange = 0;
  let shipAngleBlue = 0;

  // Handler to rotate ships (that are going to be placed onto the board) by clicking rotate ships btn.
  const dialogPlaceShipsGameBoardRotateShipsBtnElClickEventHandler = (e) => {
    const closestDialogEl = e.target.closest('[data-dialog-place]');
    const shipContEl = closestDialogEl.querySelector('[data-ship-cont]');

    const closestDialogElClassList = Array.from(closestDialogEl.classList);

    let targetFleet;
    closestDialogElClassList.forEach((classValue) => {
      if (classValue === 'dialog--place-blue') {
        targetFleet = 'blue';
      } else if (classValue === 'dialog--place-org') {
        targetFleet = 'org';
      }
    });

    if (targetFleet === 'org') {
      shipAngleOrange = shipAngleOrange === 0 ? 90 : 0;
    } else if (targetFleet === 'blue') {
      shipAngleBlue = shipAngleBlue === 0 ? 90 : 0;
    }

    const shipsElArray = Array.from(shipContEl.querySelectorAll('[data-ship]'));

    shipsElArray.forEach((ship) => {
      if (targetFleet === 'blue' ? shipAngleBlue : shipAngleOrange === 90) {
        ship.setAttribute('data-state-vertical', '');
        shipContEl.setAttribute('data-state-vertical', '');
      } else {
        ship.removeAttribute('data-state-vertical');
        shipContEl.removeAttribute('data-state-vertical');
      }
    });
  };

  // Handler to reload the page (allowing players to start a new game) by clicking new game btn (only shown in end-screen dialogs).
  const dialogNewGameBtnClickEventHandler = () => {
    location.reload();
  };

  return {
    dialogPlaceShipsGameBoardRotateShipsBtnElClickEventHandler,
    dialogNewGameBtnClickEventHandler,
  };
})();

export { DOMDialog };
