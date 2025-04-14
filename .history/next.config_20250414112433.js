/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: false, // Désactive temporairement les actions serveur expérimentales
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com",
            },
        ],
    },
    reactStrictMode: true,
};

module.exports = nextConfig;
