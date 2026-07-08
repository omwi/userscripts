// ==UserScript==
// @name         anilist: Open Genre Challenges
// @namespace    https://github.com/omwi
// @version      0.1
// @description  ctrl+q: open AWC genre challenge for open anime page
// @author       omwi
// @match        https://anilist.co/anime/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anilist.co
// ==/UserScript==

(function () {
  "use strict";

  const challengeLinks = {
    action: "https://anilist.co/forum/thread/5288/comment/2579647", // mastery
    adventure: "https://anilist.co/forum/thread/6111/comment/2916432", // mastery
    comedy: "https://anilist.co/forum/thread/5289/comment/2384786",
    // drama: "https://anilist.co/forum/thread/5875/comment/2569162", // completed
    ecchi: "https://anilist.co/forum/thread/6631/comment/2384783",
    fantasy: "https://anilist.co/forum/thread/5290/comment/2905388", // mastery
    horror: "https://anilist.co/forum/thread/5558/comment/2384780",
    "mahou shoujo": "https://anilist.co/forum/thread/6376/comment/2384765",
    mecha: "https://anilist.co/forum/thread/6112/comment/2384764",
    music: "https://anilist.co/forum/thread/6375/comment/2384763",
    mystery: "https://anilist.co/forum/thread/5557/comment/2994285", // mastery
    psychological: "https://anilist.co/forum/thread/5556/comment/2882553", // mastery
    romance: "https://anilist.co/forum/thread/5291/comment/2384761",
    "sci-fi": "https://anilist.co/forum/thread/5292/comment/2995390", // mastery
    "slice of life": "https://anilist.co/forum/thread/5293/comment/3007341", // mastery
    sports: "https://anilist.co/forum/thread/5876/comment/2384750",
    // supernatural: "https://anilist.co/forum/thread/6630/comment/2551397", // completed
    thriller: "https://anilist.co/forum/thread/5556/comment/2882553", // mastery
  };

  document.addEventListener("keyup", (e) => {
    if (e.ctrlKey && e.code === "KeyQ") {
      openGenreChallenges();
    }
  });

  function openGenreChallenges() {
    const names = getGenreNames();
    // using Set because of Thriller/Psychological 2-in-1 challenge
    const links = new Set(names.map((name) => challengeLinks[name]));
    links.delete(undefined);
    links.forEach((link) => window.open(link));
  }

  function getGenreNames() {
    const genreDataList = [...document.querySelectorAll("div.data-list")].find(
      (dataList) => dataList.querySelector("div.type").textContent === "Genres",
    );

    if (!genreDataList) return;

    return [...genreDataList.querySelectorAll("div.value span")].map(
      (genreLink) => genreLink.textContent.toLowerCase(),
    );
  }
})();
