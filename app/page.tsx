import { getAllPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

export default async function HomePage() {
  const posts = await getAllPosts()
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            The My Online Store Blog
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Stories, guides, and insights from the team behind My Online Store.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-gray-600">No posts published yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <section className="mb-12">
                <Link
                  href={`/posts/${featured.slug}`}
                  className="group grid md:grid-cols-2 gap-6 bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-200"
                >
                  <div className="aspect-[16/10] md:aspect-auto overflow-hidden bg-gray-100">
                    {featured.metadata?.featured_image ? (
                      <img
                        src={`${featured.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                        alt={featured.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl text-gray-300">
                        📝
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                      Featured
                    </span>
                    <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                      {featured.title}
                    </h2>
                    {getMetafieldValue(featured.metadata?.excerpt) && (
                      <p className="mt-3 text-gray-600 line-clamp-3">
                        {getMetafieldValue(featured.metadata?.excerpt)}
                      </p>
                    )}
                    <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                      {featured.metadata?.author && (
                        <span className="font-medium text-gray-700">
                          {getMetafieldValue(featured.metadata.author.metadata?.name) ||
                            featured.metadata.author.title}
                        </span>
                      )}
                      {featured.metadata?.publish_date && (
                        <>
                          <span>•</span>
                          <span>{formatDate(featured.metadata.publish_date)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* Latest Posts */}
            {rest.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}