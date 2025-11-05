// ==UserScript==
// @name         awc: Update Code Shortcut
// @namespace    https://github.com/omwi
// @version      0.1
// @description  ctrl+q: update code button
// @author       omwi
// @match        https://awc.moe/challenges/editor*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=awc.moe
// ==/UserScript==

(function () {
  "use strict";

  document.addEventListener("keyup", (e) => {
    if (e.ctrlKey && e.code === "KeyQ") {
      updateCode();
    }
  });

  function updateCode() {
    const updateButton = document.querySelector("#update-code");
    updateButton.click();
  }
})();
