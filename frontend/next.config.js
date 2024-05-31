/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['daisyui.com'],
      },
    env: {
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    }
}

module.exports = nextConfig
