// ==UserScript==
// @name         anilist: Open Challenge Editor
// @namespace    https://github.com/omwi
// @version      0.1
// @description  opens awc.moe challenge editor
// @author       omwi
// @match        https://anilist.co/forum/thread/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anilist.co
// ==/UserScript==

(function () {
  "use strict";

  const EDITOR_URL = "https://awc.moe/challenges/editor";

  document.addEventListener("keyup", (e) => {
    if (e.ctrlKey && e.code === "Space") {
      const [threadId, commentId] = getIds(window.location.href);
      openInEditor(threadId, commentId);
    }
  });

  function openInEditor(threadId, commentId) {
    window.open(`${EDITOR_URL}?tid=${threadId}&cid=${commentId}`);
  }

  function getIds(url) {
    return url
      .split("/")
      .map((i) => parseInt(i))
      .filter((v) => !Number.isNaN(v));
  }
})();
