/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  test: /\.(jpe?g|png|gif|svg)$/i, 
    loader: 'file-loader',
    options: {
      name: '/public/icons/[name].[ext]'
  },
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "" + new Date().getTime();
  },
  env: {
    API_PORT:
      process.env.NODE_ENV === "development"
        ? "http://localhost:1337"
        : "https://next-strapi-backend.herokuapp.com",
  },
  images: {
    loader: "default",
    // domains: ["localhost","127.0.0.1"],
    domains: [
      "https://next-strapi-backend.herokuapp.com",
      "res.cloudinary.com",
      "https://res.cloudinary.com/doe98qzoi/image/upload"
      ],
  },
}

module.exports = nextConfig
