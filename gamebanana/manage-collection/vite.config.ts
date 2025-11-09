import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        name: "gamebanana: Modify Collection",
        namespace: "https://github.com/omwi",
        version: "0.1",
        description: "Modify Collection",
        author: "omwi",
        icon: "https://www.google.com/s2/favicons?sz=64&domain=gamebanana.com",
        match: ["https://gamebanana.com/*"],
      },
      build: {
        metaFileName: true,
      },
    }),
  ],
});
