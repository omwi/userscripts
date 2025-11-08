// ==UserScript==
// @name         awc: Load Challenge
// @namespace    https://github.com/omwi
// @version      0.1
// @description  ctrl+shift+c: load challenge from copied challenge url; load challenge from url params(tid, cid)
// @author       omwi
// @match        https://awc.moe/challenges/editor*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=awc.moe
// ==/UserScript==

(function () {
  "use strict";

  const BASE_THREAD_URL = "https://anilist.co/forum";

  window.addEventListener("load", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const threadId = parseInt(urlParams.get("tid"));
    const commentId = parseInt(urlParams.get("cid"));

    if (!threadId) {
      return;
    }

    if (!commentId || commentId === 1) {
      loadNewChallenge(threadId);
      return;
    }

    const challengeUrl = await getChallengeUrl(threadId, commentId);
    loadChallenge(challengeUrl);
  });

  let isShiftKeyCopy = false;

  document.addEventListener("keydown", async (e) => {
    if (e.ctrlKey && e.shiftKey && e.code === "KeyV") {
      isShiftKeyCopy = true;
    } else {
      isShiftKeyCopy = false;
    }
  });

  window.addEventListener("paste", async (event) => {
    if (!isShiftKeyCopy) {
      return;
    }
    event.preventDefault();
    const clipboardData = event.clipboardData;
    const textContent = clipboardData.getData("text/plain");
    loadChallenge(textContent);
  });

  async function getChallengeUrl(threadId, commentId) {
    return `${BASE_THREAD_URL}/thread/${threadId}/comment/${commentId}`;
  }

  async function loadChallenge(challengeUrl) {
    const urlInput = document.querySelector("#challenge-post-url");
    const loadChallengeButton = document.querySelector("#load-challenge-button");
    urlInput.value = challengeUrl;
    loadChallengeButton.click();
  }

  async function loadNewChallenge(threadId) {
    const option = document.querySelector(`option[value="${threadId}"]`);
    console.log(option);
    if (!option) return;
    option.selected = true;
    const loadChallengeButton = document.querySelector("#load-challenge-button");
    loadChallengeButton.click();
  }
})();
