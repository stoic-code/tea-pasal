/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '182.93.93.82',
                port: '8989',
                pathname: '/**'
            }
        ],
        unoptimized: true
    }
}
