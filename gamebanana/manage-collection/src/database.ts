import Dexie, { EntityTable } from "dexie";
import {
  AUTHOR_FIELD,
  CATEGORY_FIELD,
  CREATED_AT_FIELD,
  DATABASE_NAME,
  ID_FIELD,
  ITEM_FIELDS,
  ITEM_NAME,
  TITLE_FIELD,
} from "./const";

interface Mod {
  [ID_FIELD]: number;
  [CATEGORY_FIELD]: string;
  [TITLE_FIELD]: string;
  [AUTHOR_FIELD]: string;
  [CREATED_AT_FIELD]: Date;
}

const db = new Dexie(DATABASE_NAME) as Dexie & {
  [ITEM_NAME]: EntityTable<Mod, "id">;
};

db.version(1).stores({
  [ITEM_NAME]: ITEM_FIELDS.join(", "),
});

export { db };
export type { Mod };
