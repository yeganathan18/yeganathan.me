import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "../../components/mdx";
import { allBlogs } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata | undefined> {
  const post = allBlogs.find((post) => post.slug === params.slug);
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

export default async function Blog({ params }: BlogPageProps) {
  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="max-w-2xl mx-auto mt-10">
      <script type="application/ld+json">
        {JSON.stringify(post.structuredData)}
      </script>
      <h1 className="font-bold text-3xl font-display max-w-[650px] text-zinc-100">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm max-w-[650px]">
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
          {post.publishedAt}
        </div>
        <div className="h-[0.2em] bg-neutral-50 dark:bg-neutral-800 mx-2" />
        {/* <ViewCounter slug={post.slug} trackView /> */}
      </div>
      <Mdx code={post.body.code} />
    </section>
  );
}
