/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "resend",
      // '@react-email/components',
      // '@react-email/render',
      // '@react-email/tailwind'
    ],
  },
};

module.exports = nextConfig
