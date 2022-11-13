import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import svgr from '@honkhonk/vite-plugin-svgr';
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginHtmlEnv(),
    svgr({
      svgrOptions: {
        icon: true,
        dimensions: false,
        // etc...
      },
    }),
    // {
    //   name: 'fix-swipper-css',
    //   enforce: 'pre',
    //   resolveId(id) {
    //     if (id === 'swiper.css') return 'fix-swiper.css'
    //   },
    //   load(id) {
    //     if (id === 'fix-swiper.css') {
    //       return new Promise(resolve => {
    //           fs.readFile('./node_modules/swiper/swiper.min.css', resolve)
    //       })
    //     }
    //   },
    // },
  ],
  define: {
    'process': dotenv.config().parsed,
  },
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
