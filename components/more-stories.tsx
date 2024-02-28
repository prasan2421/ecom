import PostPreview from './post-preview'

export default function MoreStories({ posts, title }) {
  return (
    <section>
      <div className="text-center mb-16">
      <h2 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
       {title}
      </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 lg:gap-x-10 gap-y-20 md:gap-y-10 mb-32">
        {posts.map(({ node }) => (
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage}
            date={node.date}
            author={node.author}
            slug={node.slug}
            excerpt={node.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
