// ==UserScript==
// @name         anilist: Comment Link Counter
// @namespace    https://github.com/omwi
// @version      0.1
// @description  adds link counter to the comment header
// @author       omwi
// @match        https://anilist.co/forum/thread/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anilist.co
// ==/UserScript==

(function () {
  "use strict";

  const ANIME_PREFIX = "/anime/";
  const MANGA_PREFIX = "/manga/";

  observeBody();

  function observeBody() {
    const targetNode = document.querySelector("body");
    const config = { childList: true, subtree: true };

    const observer = new MutationObserver(updateComments);
    observer.observe(targetNode, config);
  }

  function updateComments() {
    const comments = document.querySelectorAll(".comment");
    comments.forEach((comment) => updateComment(comment));
  }

  function updateComment(comment) {
    const linksCount = getMediaLinkCount(comment);
    const time = comment.querySelector(".header time");
    if (!time) return;
    time.setAttribute("data-counter", linksCount);
  }

  function getMediaLinkCount(comment) {
    const mediaIds = new Set();
    comment.querySelectorAll(`a[href*="${ANIME_PREFIX}"], a[href*="${MANGA_PREFIX}"]`).forEach((a) => {
      mediaIds.add(getMediaId(a.href));
    });
    mediaIds.delete(0);
    mediaIds.delete(NaN);
    return mediaIds.size;
  }

  function getMediaId(link) {
    // regex for digit(id) with anime/ or manga/ prefix
    const regex = /(?<=anime\/|manga\/)\d+/;
    return parseInt(link.match(regex)[0]);
  }
})();
