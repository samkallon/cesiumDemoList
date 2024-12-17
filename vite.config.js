import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
import path from 'path'
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    obfuscatorPlugin({
      options:{
        optionsPreset:'high-obfuscation'
      },
      apply:'build'
    }),
    vue(),cesium(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',
  root: './',
  server:{
    host:'0.0.0.0',
    port: 3957,
  }
})
