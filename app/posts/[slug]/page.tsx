// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts, getMetafieldValue } from '@/lib/cosmic'
import { formatDate, getInitials } from '@/lib/utils'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const categories = post.metadata?.categories
  const content = getMetafieldValue(post.metadata?.content)
  const publishDate = post.metadata?.publish_date

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-600 mb-8"
      >
        ← Back to all posts
      </Link>

      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <CategoryBadge key={cat.id} category={cat} />
          ))}
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
        {post.title}
      </h1>

      <div className="mt-6 flex items-center gap-3">
        {author && (
          <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-brand-100 flex items-center justify-center">
              {author.metadata?.avatar ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=88&h=88&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-brand-600">
                  {getInitials(getMetafieldValue(author.metadata?.name) || author.title)}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-600">
                {getMetafieldValue(author.metadata?.name) || author.title}
              </p>
              {publishDate && (
                <p className="text-xs text-gray-500">{formatDate(publishDate)}</p>
              )}
            </div>
          </Link>
        )}
        {!author && publishDate && (
          <p className="text-sm text-gray-500">{formatDate(publishDate)}</p>
        )}
      </div>

      {featuredImage && (
        <div className="mt-8 rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            width={800}
            height={450}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {content ? (
        <div
          className="prose prose-lg max-w-none mt-10 prose-headings:text-gray-900 prose-a:text-brand-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        getMetafieldValue(post.metadata?.excerpt) && (
          <p className="mt-10 text-lg text-gray-700 leading-relaxed">
            {getMetafieldValue(post.metadata?.excerpt)}
          </p>
        )
      )}
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}