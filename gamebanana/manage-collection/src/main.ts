// @ts-ignore isolatedModules

import { BASE_URL, MODS_ID_PREFIX } from "./const";
import { exportBackup, importBackup, saveItem, deleteItem } from "./service";
import { injectStyles } from "./styles";
import { requestPersistentStoragePermission, scrapeItem, getItemId, observeContent } from "./util";

window.addEventListener("load", () => {
  injectStyles();

  const bodyWrapper = document.body.querySelector("wrapper#BodyWrapper");
  if (!bodyWrapper) throw new Error("Body wrapper not found");
  observeContent(bodyWrapper);
});

document.addEventListener("keyup", async (e) => {
  if (e.ctrlKey && e.shiftKey && e.code === "Digit1") {
    exportBackup();
  }

  if (e.ctrlKey && e.shiftKey && e.code === "Digit2") {
    importBackup();
  }

  if (!window.location.href.startsWith(`${BASE_URL}/${MODS_ID_PREFIX}`)) return;

  if (e.ctrlKey && e.code === "KeyQ") {
    requestPersistentStoragePermission();
    saveItem(scrapeItem());
  }

  if (e.ctrlKey && e.code === "KeyZ") {
    const id = getItemId(window.location.href);
    deleteItem(id);
  }
});
