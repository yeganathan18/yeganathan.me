import type { Metadata } from "next";
import { allBlogs } from 'contentlayer/generated';
import Link from "next/link";

export const metadata: Metadata = {
	title: "Blog",
	description:
		"Read my thoughts, experiences, and insights on various topics that interest me",
};

// export default function BlogPage() {
// 	return (
// 		<div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
// 			<p className="text-4xl text-white">Coming soon...</p>
// 		</div>
// 	);
// }

export default async function BlogPage() {
	return (
	  <section>
		<h1 className="font-bold text-white text-3xl font-serif mb-5">Blog</h1>
		{allBlogs
		  .sort((a, b) => {
			if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
			  return -1;
			}
			return 1;
		  })
		  .map((post) => (
			<Link
			  key={post.slug}
			  className="flex flex-col text-white space-y-1 mb-4"
			  href={`/blog/${post.slug}`}
			>
			  <div className="w-full flex flex-col">
				<p>{post.title}</p>
				{/* <ViewCounter slug={post.slug} trackView={false} /> */}
			  </div>
			</Link>
		  ))}
	  </section>
	);
  }
  