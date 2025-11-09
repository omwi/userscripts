import { BACKUP_EXTENSION, BACKUP_NAME, CREATED_AT_FIELD, ITEM_NAME } from "./const";
import { db, Mod } from "./database";
import { handleError } from "./util";

export async function saveItem(item: Mod) {
  return db[ITEM_NAME].add(item)
    .then((result) => {
      if (result) {
        console.info(`Item saved: ${result}`);
      }
    })
    .catch(handleError);
}

export async function deleteItem(itemId: number) {
  return db[ITEM_NAME].delete(itemId)
    .then(() => console.info(`Item deleted: ${itemId}`))
    .catch(handleError);
}

export async function getAllItems() {
  return db[ITEM_NAME].toArray().catch(handleError);
}

export async function getItem(id: number) {
  return db[ITEM_NAME].get(id).catch(handleError);
}

export async function exportBackup() {
  db[ITEM_NAME].toArray()
    .then((items) => {
      const json = JSON.stringify(items, null, 2);
      const blob = new Blob([json], { type: BACKUP_EXTENSION });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = BACKUP_NAME;
      link.click();
      URL.revokeObjectURL(url);
    })
    .catch(handleError);
}

export async function importBackup() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = BACKUP_EXTENSION;
  input.onchange = async () => {
    const file = input.files?.item(0);
    if (!file) {
      throw new ReferenceError("No file selected");
    }
    file
      .text()
      .then((text) => {
        const items: Mod[] = JSON.parse(text, (key, value) => {
          if (key === CREATED_AT_FIELD) {
            return new Date(value);
          }
          return value;
        });

        db[ITEM_NAME].bulkAdd(items)
          .then(() => console.info(`Items imported: ${items.length}`))
          .catch(handleError);
      })
      .catch(handleError);
  };
  input.click();
}
