import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true, // Minimiza el HTML para producción
      template: './public/index.html', // Archivo HTML base en la carpeta public
    }),
  ],
  publicDir: 'public', // Public sirve como recursos estáticos
  build: {
    outDir: 'dist', // Carpeta de salida
    rollupOptions: {
      input: './public/index.html', // Define explícitamente el archivo de entrada
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://52.67.60.212:3000', // Asegúrate de que el backend esté corriendo en este puerto
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Alias para facilitar importaciones desde src
    },
  },
});