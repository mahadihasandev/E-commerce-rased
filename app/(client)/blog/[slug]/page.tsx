import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { SINGLE_BLOG_QUERY_RESULT } from "@/types";
import { getBlogCategories, getOthersBlog, getSingleBlog } from "@/lib/api";
import { urlFor } from "@/lib/image";
import RichTextRenderer from "@/components/RichTextRenderer";
import dayjs from "dayjs";
import { Calendar, ChevronLeftIcon, Pencil, Share2, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const blog: SINGLE_BLOG_QUERY_RESULT = await getSingleBlog(slug);
  if (!blog) return notFound();

  return (
    <div className="py-10 bg-slate-50/30 min-h-screen">
      <Container className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-shop_light_blue transition-colors mb-6 group"
          >
            <ChevronLeftIcon className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to all blogs
          </Link>

          <article className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-10">
            {blog?.mainImage && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 shadow-sm">
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt={blog.title || "Blog Image"}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-6 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                {blog?.blogcategories?.map((item, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-shop_light_blue font-medium px-3 py-1 rounded-full text-xs"
                  >
                    {item?.title}
                  </span>
                ))}
              </div>

              {blog?.author?.name && (
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Pencil size={14} className="text-slate-400" />
                  {blog.author.name}
                </span>
              )}

              <span className="flex items-center gap-1.5 font-medium text-slate-500">
                <Calendar size={14} className="text-slate-400" />
                {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
              {blog?.title}
            </h1>

            <div className="prose prose-slate max-w-none text-slate-700">
              <RichTextRenderer content={blog?.body} />
            </div>

            <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-shop_light_blue hover:underline"
              >
                <ChevronLeftIcon className="size-4" />
                More articles
              </Link>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="p-2 text-slate-500 hover:text-shop_light_blue hover:bg-slate-50 rounded-full transition-colors"
                  aria-label="Share"
                >
                  <Share2 size={18} />
                </button>
                <button
                  type="button"
                  className="p-2 text-slate-500 hover:text-shop_light_blue hover:bg-slate-50 rounded-full transition-colors"
                  aria-label="Bookmark"
                >
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
          </article>
        </div>

        <aside className="lg:col-span-1">
          <BlogSidebar slug={slug} />
        </aside>
      </Container>
    </div>
  );
};

const BlogSidebar = async ({ slug }: { slug: string }) => {
  const categories = await getBlogCategories();
  const blogs = await getOthersBlog(slug, 5);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-100 shadow-sm p-6 rounded-2xl">
        <Title className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          Categories
        </Title>
        <div className="space-y-2">
          {categories?.map((cat, index: number) => {
            const title = cat.title || "Category";
            return (
              <div
                key={index}
                className="flex items-center justify-between text-sm text-slate-600 hover:text-shop_light_blue transition-colors py-1 cursor-pointer"
              >
                <span>{title}</span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                  •
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-slate-100 shadow-sm p-6 rounded-2xl">
        <Title className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          Related Articles
        </Title>
        <div className="space-y-4">
          {blogs?.map((blog, index) => (
            <Link
              href={`/blog/${blog?.slug?.current}`}
              key={index}
              className="flex items-center gap-3 group"
            >
              {blog?.mainImage && (
                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-100">
                  <Image
                    src={urlFor(blog?.mainImage).url()}
                    alt="blog thumbnail"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="line-clamp-2 text-xs font-semibold text-slate-800 group-hover:text-shop_light_blue transition-colors leading-snug">
                  {blog?.title}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;