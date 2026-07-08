// ==UserScript==
// @name         awc: Select updated requirement
// @namespace    https://github.com/omwi
// @version      0.1
// @description  selects text of requirement on update
// @author       omwi
// @match        https://awc.moe/challenges/editor*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=awc.moe
// ==/UserScript==

(function () {
  'use strict';

  main();

  const DELAY = 0;

  function main() {
    const requirements = getRequirementEditors();
    for (const r of requirements) {
      const number = getRequirementNumber(r);
      const titleInput = getRequirementTitleInput(r);
      const idInput = getRequirementIdInput(r);
      titleInput.addEventListener('change', () =>
        delay(DELAY).then(() => handleInputChange(r, number)),
      );
      idInput.addEventListener('change', () =>
        delay(DELAY).then(() => handleInputChange(r, number)),
      );
    }
  }

  /**
   * @param {HTMLElement} requirement
   * @param {string} number
   */
  function handleInputChange(requirement, number) {
    const state = getRequirementState(requirement);
    if (state) {
      updateCode();
      delay(DELAY).then(() => focusRequirementText(number));
    }
  }

  function updateCode() {
    const updateButton = document.querySelector('#update-code');
    updateButton.click();
  }

  function focusRequirementText(number) {
    if (number.length === 1) {
      number = `0${number}`;
    }
    const textAreas = getTextAreas();
    for (const textArea of textAreas) {
      const fullText = textArea.value;
      const startIndex = fullText.indexOf(`${number}) [`);
      if (startIndex === -1) {
        continue;
      }
      const endIndex = textArea.value.indexOf('\n\n', startIndex);

      setSelectionRange(textArea, startIndex, endIndex);
      break;
    }
  }

  function setSelectionRange(textarea, selectionStart, selectionEnd) {
    textarea.focus();
    // First scroll selection region to view
    const fullText = textarea.value;
    textarea.value = fullText.substring(0, selectionEnd);
    // For some unknown reason, you must store the scollHeight to a variable
    // before setting the textarea value. Otherwise it won't work for long strings
    const scrollHeight = textarea.scrollHeight;
    textarea.value = fullText;
    let scrollTop = scrollHeight;
    const textareaHeight = textarea.clientHeight;
    if (scrollTop > textareaHeight) {
      // scroll selection to center of textarea
      scrollTop -= textareaHeight / 2;
    } else {
      scrollTop = 0;
    }
    textarea.scrollTop = scrollTop;

    // Continue to set selection range
    textarea.setSelectionRange(selectionStart, selectionEnd);
  }

  /**
   *
   * @returns {NodeListOf<HTMLTextAreaElement>}
   */
  function getTextAreas() {
    return document.querySelectorAll('textarea.code-display');
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * @returns {HTMLElement}
   */
  function getRequirementEditors() {
    return document.querySelectorAll('.editor-requirement');
  }

  /**
   * @param {HTMLElement} requirement
   * @returns {string}
   */
  function getRequirementNumber(requirement) {
    return requirement.querySelector('.requirement-number').textContent;
  }

  /**
   * @param {HTMLElement} requirement
   * @returns {boolean}
   */
  function getRequirementState(requirement) {
    return requirement.querySelector('input[type="checkbox"]').checked;
  }

  /**
   * @param {HTMLElement} requirement
   * @returns {HTMLInputElement}
   */
  function getRequirementTitleInput(requirement) {
    return requirement.querySelector('.requirement-media');
  }

  /**
   * @param {HTMLElement} requirement
   * @returns {HTMLInputElement}
   */
  function getRequirementIdInput(requirement) {
    return requirement.querySelector('.requirement-media-id');
  }
})();
