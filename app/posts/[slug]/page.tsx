import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "../../components/mdx";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { ArrowLeft, Github, Twitter } from "lucide-react";
import { Redis } from "@upstash/redis";
import { ReportView } from "./view";
import "./mdx.css";
import { BlogPageHeader } from "./header";
import Balancer from "react-wrap-balancer";

export const revalidate = 60;
const redis = Redis.fromEnv();

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata | undefined> {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  const ogImage = image
    ? `https://yeganathan.me${image}`
    : `https://yeganathan.me/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://yeganathan.me/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: PostPageProps) {
  const slug = params.slug;
  const post = allPosts.find((post) => post.slug === slug);

  const views =
    (await redis.get<number>(["pageviews", "posts", slug].join(":"))) ?? 0;

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <BlogPageHeader post={post} views={views} />
      <div className="px-6 pt-8 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 prose prose-zinc prose-quoteless">
        <ReportView slug={post.slug} />
        <article className="container relative max-w-3xl mx-auto">
          <script type="application/ld+json">
            {JSON.stringify(post.structuredData)}
          </script>
          <Mdx code={post.body.code} />
          <hr className="mt-12 border-zinc-500" />
          <div className="flex justify-center pb-6">
            <Link
              href="/posts"
              className="duration-200 text-zinc-600 hover:text-zinc-900 flex items-center gap-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              See all posts
            </Link>
          </div>
        </article>
      </div>
      <div className="py-12 bg-gradient-to-tl from-black via-zinc-900 to-black md:py-32">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-y-8 px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display max-w-3xl text-2xl text-zinc-100 sm:text-4xl">
            <Balancer>Do you spot any errors in this post?</Balancer>
          </h1>
          <p className="max-w-lg text-base text-zinc-500">
            Don't hesitate to submit a pull request on{" "}
            <Link target="_blank" href="https://github.com/yeganathan18/yeganathan.me" className="underline text-zinc-400 hover:text-zinc-300 hover:decoration-emerald-400">
              GitHub
            </Link>
            , or drop me a message on {" "}
            <Link target="_blank" href="https://twitter/yeganathans" className="underline text-zinc-400 hover:text-zinc-300 hover:decoration-emerald-400">
              Twitter
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
