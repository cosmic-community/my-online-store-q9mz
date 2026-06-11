import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const author = post.metadata?.author
  const publishDate = post.metadata?.publish_date

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <Link href={`/posts/${post.slug}`}>
        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
              📝
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        {post.metadata?.categories && post.metadata.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.metadata.categories.slice(0, 2).map((cat) => (
              <span
                key={cat.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700"
              >
                {getMetafieldValue(cat.metadata?.name) || cat.title}
              </span>
            ))}
          </div>
        )}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        {excerpt && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{excerpt}</p>
        )}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          {author && (
            <span className="font-medium text-gray-700">
              {getMetafieldValue(author.metadata?.name) || author.title}
            </span>
          )}
          {author && publishDate && <span>•</span>}
          {publishDate && <span>{formatDate(publishDate)}</span>}
        </div>
      </div>
    </article>
  )
}