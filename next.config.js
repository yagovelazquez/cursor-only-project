/** @type {import('next').NextConfig} */
const nextConfig = {
  // This experimental flag helps with route handler types
  experimental: {
    typedRoutes: true,
  },
  // Ensure we're using the correct TypeScript configuration
  typescript: {
    // This will allow the build to continue even with type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This will allow the build to continue even with ESLint errors
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 