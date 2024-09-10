import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon-32x32",
        "apple-touch-icon.png",
        "android-chrome-192x192",
        "android-chrome-512x512",
      ],
      manifest: {
        name: "E-Shop | Abdulboriy_Codes",
        short_name: "E-Shop",
        theme_color: "#ffffff",
        icons: [
          {
            src: "android-chrome-192x192",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "apple-touch-icon",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "favicon-32x32",
            sizes: "32x32",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  server: {
    watch: {
      usePolling: true,
    },
  },
});
