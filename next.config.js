import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "sun.halumai.com",
				pathname: "/uploads/**",
			},
			{
				protocol: "http",
				hostname: "152.53.210.205",
				port: "5800",
				pathname: "/uploads/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "5800",
				pathname: "/uploads/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "5001",
				pathname: "/media/**",
			},
			// Custom domain patterns - add your domain here
			{
				protocol: "https",
				hostname: process.env.NEXT_PUBLIC_DOMAIN || "localhost",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: `*.${process.env.NEXT_PUBLIC_DOMAIN || "localhost"}`,
				pathname: "/**",
			},
		],
		dangerouslyAllowSVG: true,
		unoptimized: true,
	},
	async headers() {
		const allowedOrigins = [
			process.env.NEXT_PUBLIC_SERVER_URL,
			`https://${process.env.NEXT_PUBLIC_DOMAIN}`,
			`https://www.${process.env.NEXT_PUBLIC_DOMAIN}`,
			"http://localhost:5001",
			"http://localhost:3000",
		].filter(Boolean);

		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Cross-Origin-Embedder-Policy",
						value: "unsafe-none",
					},
					{
						key: "Cross-Origin-Resource-Policy",
						value: "cross-origin",
					},
					{
						key: "Access-Control-Allow-Origin",
						value: allowedOrigins[0] || "*",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "X-Requested-With, Content-Type, Authorization",
					},
				],
			},
			// API routes CORS
			{
				source: "/api/:path*",
				headers: [
					{
						key: "Access-Control-Allow-Credentials",
						value: "true",
					},
					{
						key: "Access-Control-Allow-Origin",
						value: allowedOrigins[0] || "*",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "X-Requested-With, Content-Type, Authorization",
					},
				],
			},
		];
	},
};

export default withPayload(nextConfig);
