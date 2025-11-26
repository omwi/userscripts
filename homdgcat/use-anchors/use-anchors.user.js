// ==UserScript==
// @name         homdgcat: Use anchor element for links
// @namespace    https://github.com/omwi
// @version      0.1
// @description  replaces div links with <a> links to open in new tabs
// @author       omwi
// @match        https://homdgcat.wiki/gi/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=homdgcat.wiki
// ==/UserScript==

(function () {
  'use strict';

  observeBody();

  function observeBody() {
    const targetNode = document.querySelector('body');
    const config = { childList: true, subtree: true };

    const observer = new MutationObserver(updateLinks);
    observer.observe(targetNode, config);
  }

  function updateLinks() {
    const links = queryLinks();
    links.forEach((link) => wrapInAnchor(link));
  }

  function queryLinks() {
    return document.querySelectorAll('div[data-link]');
  }

  function wrapInAnchor(link) {
    const parent = link.parentElement;
    if (parent instanceof HTMLAnchorElement) {
      console.info('Skipping <a> wrapped element');
      return;
    }
    const a = document.createElement('a');
    a.href = link.dataset.link;
    parent.insertBefore(a, link);
    a.appendChild(link);
  }
})();
