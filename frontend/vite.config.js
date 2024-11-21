import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  root: '.', // Asegúrate de que Vite use la carpeta raíz como raíz del proyecto
});