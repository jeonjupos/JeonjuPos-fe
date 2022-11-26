import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginHtmlEnv from 'vite-plugin-html-env';
const envRecords = require('./env.cjs');
import path, {join} from 'path';

const getEnv = () => {
  const env = {};
  // eslint-disable-next-line guard-for-in
  for (const key in envRecords) {
    env[key] = envRecords[key][process.env.PHASE] ?? `${key}: NO ENV VALUE in ${process.env.PHASE}`;
  }
  return {...process.env, ...env};
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
      babel: {
        plugins: [
          ['babel-plugin-less-for-styled-components', { globalImports: [join(__dirname, 'src/styles/proj')] }],
        ],
      },
    }),
    VitePluginHtmlEnv(),

  ],
  define: {
    'process.env': getEnv(),
  },
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    },
  },
});
