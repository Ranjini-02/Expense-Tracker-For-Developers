import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  // Relative base avoids 404s for JS/CSS assets on GitHub Pages project sites.
  base: mode === "production" ?"/Expense-Tracker-For-Developers/" : "/"
}));
