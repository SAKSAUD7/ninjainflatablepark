/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/database", "@repo/config"],
};

module.exports = nextConfig;
