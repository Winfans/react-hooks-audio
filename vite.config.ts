import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

enum EnvEnum {
  PROD = 'prod', // 生产环境
  DEV = 'dev', // 开发环境
}

const isDev = process.env.ENV === EnvEnum.DEV;

export default defineConfig({
  base: isDev ? '' : 'react-hooks-audio',
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  define: {
    'import.meta.env.ENV': JSON.stringify(process.env.ENV),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './example/pages'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: '/',
    warmup: {
      clientFiles: [],
    },
  },
});
