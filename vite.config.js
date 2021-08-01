import { VitePWA } from 'vite-plugin-pwa'

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  base: isProduction ? '/Traly/' : '/',
  plugins: [
    VitePWA({
      mode: isProduction ? 'production' : 'development',
    })
  ]  
}
