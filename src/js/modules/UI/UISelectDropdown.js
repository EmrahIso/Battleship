function UICreateSelectDropdown(parentEl) {
  const selectDropdown = document.createElement('div');
  selectDropdown.classList.add('select-dropdown');
  selectDropdown.id = 'select-dropdown';
  selectDropdown.setAttribute('data-select-dropdown', '');
  selectDropdown.setAttribute('data-select-dropdown-active', 'false');
  parentEl.appendChild(selectDropdown);

  const selectDropdownOpenBtn = document.createElement('button');
  selectDropdownOpenBtn.type = 'button';
  selectDropdownOpenBtn.setAttribute('data-select-dropdown-open-btn', '');
  selectDropdownOpenBtn.setAttribute('role', 'combobox');
  selectDropdownOpenBtn.setAttribute('aria-labelledby', 'select-dropdown');
  selectDropdownOpenBtn.id = 'select-dropdown-btn';
  selectDropdownOpenBtn.type = 'button';
  selectDropdownOpenBtn.classList.add('select-dropdown__open-btn');
  selectDropdown.appendChild(selectDropdownOpenBtn);

  const selectDropdownValue = document.createElement('span');
  selectDropdownValue.classList.add('select-dropdown__value');
  selectDropdownValue.setAttribute('data-select-dropdown-display-value', '');
  selectDropdownValue.textContent = 'AI Difficulty';
  selectDropdownOpenBtn.appendChild(selectDropdownValue);

  const selectDropdownArrow = document.createElement('span');
  selectDropdownArrow.classList.add('select-dropdown__arrow');
  selectDropdownOpenBtn.appendChild(selectDropdownArrow);

  const selectDropdownList = document.createElement('ul');
  selectDropdownList.classList.add('select-dropdown__list');
  selectDropdownList.id = 'select-dropdown-list';
  selectDropdownList.setAttribute('role', 'listbox');
  selectDropdown.appendChild(selectDropdownList);

  const listItem1 = document.createElement('li');
  listItem1.setAttribute('role', 'option');
  listItem1.setAttribute('data-select-dropdown-option', '');
  selectDropdownList.appendChild(listItem1);

  const listInput1 = document.createElement('input');
  listInput1.type = 'radio';
  listInput1.id = 'easy';
  listInput1.value = 'easy';
  listInput1.name = 'ai-difficulty';
  listItem1.appendChild(listInput1);

  const listLabel1 = document.createElement('label');
  listLabel1.textContent = 'Easy';
  listLabel1.setAttribute('for', 'easy');
  listItem1.appendChild(listLabel1);

  const listItem2 = document.createElement('li');
  listItem2.setAttribute('role', 'option');
  listItem2.setAttribute('data-select-dropdown-option', '');
  selectDropdownList.appendChild(listItem2);

  const listInput2 = document.createElement('input');
  listInput2.type = 'radio';
  listInput2.id = 'medium';
  listInput2.value = 'medium';
  listInput2.name = 'ai-difficulty';
  listInput2.checked = true;
  listItem2.appendChild(listInput2);

  const listLabel2 = document.createElement('label');
  listLabel2.textContent = 'Medium';
  listLabel2.setAttribute('for', 'medium');
  listItem2.appendChild(listLabel2);

  const listItem3 = document.createElement('li');
  listItem3.setAttribute('role', 'option');
  listItem3.setAttribute('data-select-dropdown-option', '');
  selectDropdownList.appendChild(listItem3);

  const listInput3 = document.createElement('input');
  listInput3.type = 'radio';
  listInput3.id = 'hard';
  listInput3.value = 'hard';
  listInput3.name = 'ai-difficulty';
  listItem3.appendChild(listInput3);

  const listLabel3 = document.createElement('label');
  listLabel3.textContent = 'Hard';
  listLabel3.setAttribute('for', 'hard');
  listItem3.appendChild(listLabel3);

  return selectDropdown;
}

export { UICreateSelectDropdown };
