import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		appDir: true,
		mdxRs: true,
	},
	images: {
		domains: ['dev-to-uploads.s3.amazonaws.com', 'i.giphy.com', 'images.unsplash.com'],
	},
};

export default withContentlayer(nextConfig);
