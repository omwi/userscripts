// ==UserScript==
// @name         anilist: Tab User Lists
// @namespace    https://github.com/omwi
// @version      0.1
// @description  ctrl+q: switch to next list
// @author       omwi
// @match        https://anilist.co/user/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anilist.co
// ==/UserScript==

(function () {
  "use strict";

  document.addEventListener("keyup", (e) => {
    if (e.ctrlKey && e.code === "KeyQ") {
      clickNextTab();
    }
  });

  function clickNextTab() {
    const tabs = document.querySelectorAll("div.filter-group > span");
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      if (!tab.classList.contains("active")) {
        continue;
      }
      if (i + 1 === tabs.length) {
        tabs[0].click();
        continue;
      }
      tabs[i + 1].click();
    }
  }
})();
