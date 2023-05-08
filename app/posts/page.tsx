import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Info } from "../components/info";
import { formatDate } from "@/utils/common";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read my thoughts, experiences, and insights on various topics that interest me",
};

export default async function BlogPage() {
  const views = (
    await redis.mget<number[]>(
      ...allPosts.map((p) => ["pageviews", "posts", p.slug].join(":"))
    )
  ).reduce((acc, v, i) => {
    acc[allPosts[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Blog
          </h2>
          <p className="mt-4 text-zinc-400">
            Some off-topic explorations, thoughts, and generally anything that
            interests me.
          </p>
        </div>
        <section>
          {allPosts
            .sort((a, b) => {
              if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
                return -1;
              }
              return 1;
            })
            .map((post) => (
              <div
                key={post.slug}
                className="py-6 border-t border-b border-zinc-800 max-h-max max-w-4xl space-y-2"
              >
                <div className="flex  flex-col md:flex-row justify-between">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-white text-xl group transition duration-200"
                  >
                    {post.title}
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-emerald-400" />
                  </Link>

                  <span className="text-zinc-500 hidden text-xs md:flex font-mono items-center gap-1">
                    <Eye className="w-5 h-5" />{" "}
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(views[post.slug] ?? 0)}{" "}
                    views
                  </span>
                </div>

                <p
                  className="text-zinc-500 text-sm 
                  flex"
                >
                  {formatDate(post.publishedAt)}

                  <span className="text-zinc-500 pl-2 text-xs sm:hidden flex font-mono items-center gap-1">
                    <Eye className="w-3 h-3" />{" "}
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(views[post.slug] ?? 0)}{" "}
                    views
                  </span>
                </p>

                <p className="text-zinc-400 text-sm">{post.summary}</p>
              </div>
            ))}
        </section>
      </div>
      <Info title="Note for readers 🍀">
        <p className="text-xs text-zinc-400">
          All my blog posts are cross posted on{" "}
          <Link
            className="underline hover:decoration-emerald-500"
            href="https://dev.to/yeganathan18"
          >
            dev.to/yeganathan18
          </Link>{" "}
          for better reach.
        </p>
      </Info>
    </div>
  );
}
