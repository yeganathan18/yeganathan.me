// import { allBlogs } from "contentlayer/generated";

export default async function sitemap() {
	// const blogs = allBlogs.map((post) => ({
	//   url: `https://yeganathan.me/blog/${post.slug}`,
	//   lastModified: post.publishedAt,
	// }));

	const routes = ["", "/blog", "/projects", "/contact"].map((route) => ({
		url: `https://yeganathan.me${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes];
}
