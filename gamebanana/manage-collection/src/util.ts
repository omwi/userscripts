import { MODS_ID_PREFIX } from "./const";
import { Mod } from "./database";
import { getItem } from "./service";
import { SHADOW_CLASS_NAME } from "./styles";

export function getItemId(link: string): number {
  // regex for digit(id) with ${ID_PREFIX} prefix
  const regex = new RegExp(`(?<=${MODS_ID_PREFIX})[0-9]+`);
  const id = link.match(regex);
  if (!id) {
    throw new TypeError(`Couldn't parse id from link:${link}`);
  }
  return parseInt(id[0]);
}

export function scrapeItem(): Mod {
  const id = getItemId(window.location.href);
  const title = document.querySelector("h1#PageTitle")?.textContent?.replaceAll("\t", "").replaceAll("\n", "");
  if (!title) throw new Error("Couldn't scrape title");
  const author = document
    .querySelector("#SubmitterModule a.Avatar")
    ?.querySelector("img[alt]")
    ?.getAttribute("alt")
    ?.replace(" avatar", "");
  if (!author) throw new Error("Couldn't scrape author");
  const category = document.querySelector("#Breadcrumb a:nth-last-child(3)")?.textContent;
  if (!category) throw new Error("Couldn't scrape category");
  return {
    id: id,
    category: category,
    title: title,
    author: author,
    createdAt: new Date(),
  };
}

export function observeContent(target: Element) {
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver(updateItems);
  observer.observe(target, config);
}

function updateItems() {
  const items = document.querySelectorAll(".ModRecord");
  items.forEach(updateItem);
}

function updateItem(elem: Element) {
  const link = elem.querySelector("a")?.href;
  if (!link) throw new Error("Couldn't retrieve link for item");
  const id = getItemId(link);
  getItem(id).then((item) => {
    if (item) {
      elem.classList.add(SHADOW_CLASS_NAME);
    }
  });
}

export function requestPersistentStoragePermission() {
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then((persistent) => {
      if (persistent) {
        console.info("Persistent Storage permission granted.");
      } else {
        console.error("Persistent Storage permission denied.");
      }
    });
  }
}

export function handleError(error: any) {
  if (error.name && error.message) {
    console.error(`${error.name}: ${error.message}`);
    return;
  }
  console.error(`Error: ${JSON.stringify(error)}`);
}
