import { defineConfig } from "astro/config";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
const env = loadEnv("", process.cwd(), "STORYBLOK");
import robots from "astro-robots";
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: "https://janefaram.com",
  prefetch: true,
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  integrations: [
    (await import("@playform/compress")).default({
      CSS: false,
      Image: false,
    }),
    robots(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        page: "storyblok/Page",
        richTextTest: "storyblok/RichTextTest",
      },
      apiOptions: {
        // Choose your Storyblok space region
        // region: "us", // optional,  or 'eu' (default)
      },
    }),
    icon(),
    sitemap(),
  ],
  build: {
    assets: "assets", // Specify assets directory
  },
});
