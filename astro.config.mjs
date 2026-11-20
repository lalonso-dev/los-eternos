import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://los-eternos.site",
  integrations: [sitemap({ filter: (page) => !page.includes("/admin") && !page.includes("/404") })],
  vite: {
    plugins: [tailwindcss()],
  },
});
