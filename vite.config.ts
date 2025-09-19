import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vite.dev/config/
export default defineConfig({
  // base: "/botc-script-checker",
  base: "https://johnforster.github.io/botc-script-checker",
  plugins: [preact()],
});
