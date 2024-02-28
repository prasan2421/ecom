import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {

  const decodedExcerpt = excerpt.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '');

  return (
   <div>
    <Link
    href={`/posts/${slug}`}
   
  >
    <div className='h-full hover:shadow-medium transition-shadow duration-200 w-full rounded-lg p-7 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"'>
      <div className="mb-5">
        {coverImage && (
          <CoverImage title={title} coverImage={coverImage} slug={slug} />
        )}
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
       {title}
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      <div
        className="text-lg leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: decodedExcerpt }}
      />
      {/* <Avatar author={author} /> */}
    </div>
    </Link>
    </div>
  )
}
