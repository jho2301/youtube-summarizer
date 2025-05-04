import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  output: {
    copy: [
      {
        from: "./CNAME",
        to: ".",
      },
    ],
  },
  performance: {
    preload: {
      type: "all-chunks",
      include: (filename) =>
        [
          "hero-image",
          "description-text",
          "title-description-family",
          "dahye-kid",
          "hwano-kid",
        ].some((v) => filename.includes(v)),
    },
  },
  html: {
    title: "toast to love",
    meta: {
      description: "toast to love",
      viewport:
        "width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0",
    },
    tags: [
      {
        tag: "meta",
        attrs: {
          property: "og:title",
          content: "Toast to love",
        },
      },
      {
        tag: "meta",
        attrs: {
          property: "og:description",
          content: "전환오 장다혜 결혼해요",
        },
      },
      {
        tag: "meta",
        attrs: {
          property: "og:image",
          content: "/og.png",
        },
      },
      {
        tag: "meta",
        attrs: {
          property: "og:type",
          content: "webpage",
        },
      },
      {
        tag: "meta",
        attrs: {
          property: "og:url",
          content: "https://haru-fano.xyz/",
        },
      },
      {
        tag: "link",
        attrs: {
          rel: "stylesheet",
          as: "style",
          crossorigin: true,
          href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css",
        },
      },
    ],
  },
  plugins: [pluginReact()],
});
