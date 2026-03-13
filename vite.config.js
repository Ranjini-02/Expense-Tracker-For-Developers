import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getBaseFromHomepage() {
  try {
    const pkgPath = path.join(__dirname, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

    if (!pkg?.homepage) return "/";

    const url = new URL(pkg.homepage);
    const pathname = url.pathname || "/";
    return pathname.endsWith("/") ? pathname : `${pathname}/`;
  } catch {
    return "/";
  }
}

export default defineConfig(({ mode }) => ({
  // Keep dev server at `/` for local development, but build with the correct
  // GitHub Pages subpath (derived from `package.json#homepage`).
  base: mode === "production" ?"/Expense-Tracker-For-Developers/" : "/"
}));

