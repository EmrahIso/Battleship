const DOMSelectDropdown = (function () {
  const openDropdownBtnElClickEventHandler = (e) => {
    const selectDropdownEl = document.querySelector('[data-select-dropdown]');
    const openDropdownBtnEl = document.querySelector(
      '[data-select-dropdown-open-btn]',
    );

    // Toggle dropdown
    if (
      selectDropdownEl.getAttribute('data-select-dropdown-active') === null ||
      selectDropdownEl.getAttribute('data-select-dropdown-active') === 'false'
    ) {
      selectDropdownEl.setAttribute('data-select-dropdown-active', 'true');
    } else {
      selectDropdownEl.setAttribute('data-select-dropdown-active', 'false');
    }

    // Update aria-expanded attribute for accessability
    openDropdownBtnEl.setAttribute(
      'aria-expanded',
      openDropdownBtnEl.getAttribute('aria-expanded') === 'true'
        ? 'false'
        : 'true',
    );
  };

  const autoCloseSelectDropdownElClickEventHandler = (e) => {
    const selectDropdownEl = document.querySelector('[data-select-dropdown]');

    const displaySelectedValueEl = document.querySelector(
      '[data-select-dropdown-display-value]',
    );

    // To automatically close dropdown after clicking selected value

    if (e.type === 'click' && e.target.hasAttribute('for')) {
      // e.target.hasAttribute('for') => to make sure that label is clicked
      displaySelectedValueEl.textContent = e.target.textContent;
      selectDropdownEl.setAttribute('data-select-dropdown-active', 'false');
    }
  };

  const autoCloseSelectDropdownElKeydownEventHandler = (e) => {
    const selectDropdownEl = document.querySelector('[data-select-dropdown]');

    const isSelectDropdownOpen = selectDropdownEl.getAttribute(
      'data-select-dropdown-active',
    );

    const displaySelectedValueEl = document.querySelector(
      '[data-select-dropdown-display-value]',
    );

    const optionsElsNodeList = document.querySelectorAll(
      '[data-select-dropdown-option]',
    );

    if (isSelectDropdownOpen === 'true' && e.key === 'Enter') {
      let selectedOptionIndex;

      optionsElsNodeList.forEach((liEl, index) => {
        if (liEl.querySelector('[type=radio]').checked) {
          selectedOptionIndex = index;
        }
      });

      displaySelectedValueEl.textContent = optionsElsNodeList[
        selectedOptionIndex
      ].querySelector('[type=radio] + label').textContent;
    }
  };

  const keyboardSupportForSelectDropdownElKeyupEventHandler = (e) => {
    const selectDropdownEl = document.querySelector('[data-select-dropdown]');

    const isSelectDropdownOpen = selectDropdownEl.getAttribute(
      'data-select-dropdown-active',
    );

    const optionsElsNodeList = document.querySelectorAll(
      '[data-select-dropdown-option]',
    );

    if (isSelectDropdownOpen === 'true' && e.type === 'keyup') {
      const usedKey = e.key;
      let selectedOptionIndex;

      optionsElsNodeList.forEach((liEl, index) => {
        if (liEl.querySelector('[type=radio]').checked) {
          selectedOptionIndex = index;
        }
      });

      if (usedKey === 'ArrowDown') {
        selectedOptionIndex =
          selectedOptionIndex < 2
            ? selectedOptionIndex + 1
            : selectedOptionIndex;
      } else if (usedKey === 'ArrowUp') {
        selectedOptionIndex =
          selectedOptionIndex > 0
            ? selectedOptionIndex - 1
            : selectedOptionIndex;
      }

      optionsElsNodeList[selectedOptionIndex].querySelector(
        '[type=radio]',
      ).checked = true;
    }
  };

  return {
    openDropdownBtnElClickEventHandler,
    autoCloseSelectDropdownElClickEventHandler,
    autoCloseSelectDropdownElKeydownEventHandler,
    keyboardSupportForSelectDropdownElKeyupEventHandler,
  };
})();

export { DOMSelectDropdown };
