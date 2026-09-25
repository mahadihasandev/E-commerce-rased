import { Title } from "./ui/text";
import { getLatestBlogs } from "@/lib/api";
import Image from "next/image";
import { urlFor } from "@/lib/image";
import Link from "next/link";
import { Calendar1Icon, ArrowRight } from "lucide-react";
import dayjs from "dayjs";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();

  return (
    <div className="mb-14 md:mb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-shop_light_blue">
            Insights & Guides
          </span>
          <Title className="text-2xl font-bold text-slate-900 mt-0.5">
            Latest from Our Blog
          </Title>
        </div>
        <Link
          href="/blog"
          className="text-xs font-semibold text-shop_light_blue hover:text-blue-700 flex items-center gap-1 transition-colors group"
        >
          View all posts
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <article
            key={blog._id}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl hover:shadow-shop_light_blue/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            {blog.mainImage && (
              <Link
                href={`/blog/${blog?.slug?.current}`}
                className="relative overflow-hidden aspect-video w-full bg-slate-100 block"
              >
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt={blog.title || "Blog Image"}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </Link>
            )}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.blogcategories?.map((category, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-shop_light_blue font-medium px-2.5 py-0.5 rounded-full text-[11px]"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Calendar1Icon size={13} />
                    {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                  </span>
                </div>

                <Link href={`/blog/${blog?.slug?.current}`}>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-shop_light_blue transition-colors line-clamp-2 leading-snug">
                    {blog?.title}
                  </h3>
                </Link>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between text-xs">
                <span className="text-slate-400">By {blog.author?.name || "Editor"}</span>
                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="font-semibold text-shop_light_blue flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  Read more <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
