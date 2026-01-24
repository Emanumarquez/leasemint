/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // No remote domains needed - using local images only
    unoptimized: false,
  },
}

module.exports = nextConfig
