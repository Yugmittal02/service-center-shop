import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Saini Refrigeration Admin',
        short_name: 'Saini Admin',
        description: 'Manage bookings and site content for Saini Refrigeration.',
        theme_color: '#0f766e',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/images/pwa_icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/pwa_icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
