// ==UserScript==
// @name         anilist: Submit Challenge
// @namespace    https://github.com/omwi
// @version      0.1
// @description  open and prefill AWC challenge submission form
// @author       omwi
// @match        https://anilist.co/forum/thread/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anilist.co
// ==/UserScript==

(function () {
  "use strict";

  const USERNAME = "omwi";
  const OPTIONAL_NOTE = "";

  const GOOGLE_FORM_ID = "1FAIpQLSdTe4xFCtTw99L4vlXBTg4H-cK0-CsbcRcZrEGh-zoO6PPNJA";
  const USERNAME_ENTRY_KEY = "entry.266629752";
  const CHALLENGE_TITLE_ENTRY_KEY = "entry.155745218";
  const CHALLENGE_URL_ENTRY_KEY = "entry.1897961336";
  const OPTIONAL_NOTE_ENTRY_KEY = "entry.1678530832";

  document.addEventListener("keyup", async (e) => {
    if (e.ctrlKey && e.code === "KeyQ") {
      submitChallenge();
    }
  });

  async function submitChallenge() {
    const comment = document.querySelector(".comment");
    const challengeTitle = comment.querySelector("h1").textContent;

    let hintPrompt = challengeTitle;

    if (hintPrompt.includes("Monthly")) {
      hintPrompt += " — Hard Mode";
    }

    if (hintPrompt.includes("Genre")) {
      hintPrompt += " — Mode: ";
    }

    const subtitle = await getSubtitle(comment);
    if (subtitle) {
      hintPrompt += ` — ${subtitle}`;
    }

    const submissionPrompt = prompt("Submission text", hintPrompt);
    if (submissionPrompt === null) {
      return;
    }

    openGoogleForm(USERNAME, submissionPrompt, window.location.href);
  }

  async function openGoogleForm(username, challengeTitle, challengeUrl) {
    const googleFormUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/viewform`;
    const params = {
      [USERNAME_ENTRY_KEY]: username,
      [CHALLENGE_TITLE_ENTRY_KEY]: challengeTitle,
      [CHALLENGE_URL_ENTRY_KEY]: challengeUrl,
      // [OPTIONAL_NOTE_ENTRY_KEY]: OPTIONAL_NOTE,
    };
    const urlParams = new URLSearchParams(params);

    window.open(`${googleFormUrl}?${urlParams.toString()}`);
  }

  async function getSubtitle(comment) {
    const subtitleParagraph = comment.querySelector("p");
    if (subtitleParagraph.querySelector("a")) {
      return null;
    }

    const subtitle = subtitleParagraph.textContent;
    if (subtitle.includes("Start Date:")) {
      return null;
    }
    return subtitle;
  }
})();
