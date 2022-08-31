/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  test: /\.(jpe?g|png|gif|svg)$/i, 
    loader: 'file-loader',
    options: {
      name: '/public/icons/[name].[ext]'
  },
  images: {
    loader: "default",
    domains: ["localhost","127.0.0.1"],
  },
}

module.exports = nextConfig
