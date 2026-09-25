import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { getAllBlogs } from "@/lib/api";
import { urlFor } from "@/lib/image";
import dayjs from "dayjs";
import { Calendar1Icon, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogPage = async () => {
  const blogs = await getAllBlogs(12);

  return (
    <div className="py-10 bg-slate-50/50 min-h-screen">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <Title className="text-3xl font-extrabold tracking-tight text-shop_dark_blue">
            Our Latest Stories & Insights
          </Title>
          <p className="text-sm text-gray-500">
            Expert gadget reviews, purchasing advice, and tech news straight from our team.
          </p>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs?.map((blog) => (
              <article
                key={blog?._id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-shop_light_blue/10 transition-all duration-300 hover:-translate-y-1"
              >
                {blog?.mainImage && (
                  <Link
                    href={`/blog/${blog?.slug?.current}`}
                    className="relative overflow-hidden aspect-video w-full bg-slate-100"
                  >
                    <Image
                      src={urlFor(blog?.mainImage).url()}
                      alt={blog?.title || "Blog Image"}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </Link>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <div className="flex flex-wrap gap-2">
                        {blog?.blogcategories?.map((category, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-shop_light_blue font-medium px-2.5 py-0.5 rounded-full"
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar1Icon size={14} className="text-slate-400" />
                        {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                      </span>
                    </div>

                    <Link href={`/blog/${blog?.slug?.current}`}>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-shop_light_blue transition-colors line-clamp-2 leading-snug">
                        {blog?.title}
                      </h3>
                    </Link>

                    {typeof blog.body === "string" && (
                      <p className="text-sm text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {blog.body}
                      </p>
                    )}
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                    {blog.author && (
                      <span className="text-xs font-semibold text-slate-700">
                        By {blog.author.name}
                      </span>
                    )}
                    <Link
                      href={`/blog/${blog?.slug?.current}`}
                      className="text-xs font-semibold text-shop_light_blue inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform ml-auto"
                    >
                      Read article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;