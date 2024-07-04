import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            const isMathJs = id.includes("mathjs");
            const isReact = id.includes("react");
            if (isMathJs) {
              return "mathjs";
            } else if (isReact) {
              return "react";
            } else {
              return "vendor";
            }
          }
        },
      },
    },
  },
});
