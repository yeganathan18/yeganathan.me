import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Redis } from "@upstash/redis";
import { ReportView } from "./view";
import "@/public/css/mdx.css";
import { Header } from "@/components/header";

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
      <Header post={post} views={views} />
      <div className="px-6 pt-8 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 prose prose-zinc prose-quoteless">
        <ReportView slug={post.slug} />
        <article className="container relative max-w-3xl mx-auto">
          <script type="application/ld+json">
            {JSON.stringify(post.structuredData)}
          </script>
          <Mdx code={post.body.code} />
          <hr className="mt-12 border-zinc-500" />
          <div className="flex justify-center py-6">
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
    </div>
  );
}
