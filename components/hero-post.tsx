import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  const decodedExcerpt = excerpt.replace(/<a\b[^>]*>(.*?)<\/a>/gi, "");

  return (
    <section className="md:mb-10 w-full rounded-lg p-7 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
      <div className="my-8 md:mb-16 ">
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} slug={slug} />
        )}
      </div>
      <div className="md:grid md:grid-cols-3 md:gap-x-5 lg:gap-x-5 mb-20 md:mb-10">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link
              href={`/posts/${slug}`}
              className="hover:underline"
              dangerouslySetInnerHTML={{ __html: title }}
            ></Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div className="md:col-span-2">
          <div
            className="text-lg leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: decodedExcerpt }}
          />
          <Avatar author={author} />
        </div>
      </div>
    </section>
  );
}
