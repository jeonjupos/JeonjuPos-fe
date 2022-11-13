import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import svgr from '@honkhonk/vite-plugin-svgr';
import babel from 'vite-plugin-babel';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginHtmlEnv(),
    // svgr({
    //   svgrOptions: {
    //     icon: true,
    //     dimensions: false,
    //     // etc...
    //   },
    // }),
    babel({
      babelConfig:{
        // plugin:[
        //   ["babel-plugin-less-for-styled-components", { "globalImports": ["src/styles/proj"] }],
        //   ["babel-plugin-styled-components", {
        //     "ssr": false,
        //     "displayName": true,
        //     "pure": true
        //   }]
        // ]
      }
    }),
  ],
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    },
  },
});
