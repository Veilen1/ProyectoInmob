import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      template: './public/index.html', // Usa el index.html de la carpeta 'public'
    })
  ],
  publicDir: 'public', // Sirve los archivos estáticos desde aquí
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src' // Alias para facilitar las rutas a src si es necesario
    }
  }
});
