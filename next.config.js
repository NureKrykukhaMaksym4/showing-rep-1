/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
                pathname: '/WGNHxjJ/ryan-gosling-barbie-642c02bd77619.jpg',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
                pathname: '/**/*',
            },
            {
                protocol: 'https',
                hostname: 'www.carwash-westland.nl',
                port: '',
                pathname: '/**/*',
            },
            {
                protocol: 'https',
                hostname: 'example.com',
                port: '',
                pathname: '/**/*',
            },
        ],
    },
}

module.exports = nextConfig
