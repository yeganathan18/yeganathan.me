import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Blog",
	description:
		"Read my thoughts, experiences, and insights on various topics that interest me",
};

export default function BlogPage() {
	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<p className="text-4xl text-white">Coming soon...</p>
		</div>
	);
}
