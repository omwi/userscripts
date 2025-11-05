// ==UserScript==
// @name         anilist: Open Releases
// @namespace    https://github.com/omwi
// @version      0.1
// @description  opens releases.moe for open anime page
// @author       omwi
// @match        https://anilist.co/anime/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anilist.co
// ==/UserScript==

(function () {
  "use strict";

  const RELEASES_URL = "https://releases.moe";
  const ID_PREFIX = "anime/";

  document.addEventListener("keyup", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "b") {
      const id = getId();
      openReleases(id);
    }
  });

  function getId() {
    const url = window.location.href;
    const idStartIndex = url.indexOf(ID_PREFIX) + ID_PREFIX.length;
    let idEndIndex = url.indexOf("/", idStartIndex);
    if (idEndIndex === -1) {
      idEndIndex = url.length;
    }
    return url.substring(idStartIndex, idEndIndex);
  }

  function openReleases(id) {
    window.open(`${RELEASES_URL}/${id}`);
  }
})();
