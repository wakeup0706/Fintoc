// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [vercel()],
});
