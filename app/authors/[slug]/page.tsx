// app/authors/[slug]/page.tsx
import {
  getAuthorBySlug,
  getPostsByAuthor,
  getAllAuthors,
  getMetafieldValue,
} from '@/lib/cosmic'
import { getInitials } from '@/lib/utils'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const role = getMetafieldValue(author.metadata?.role)
  const bio = getMetafieldValue(author.metadata?.bio)
  const avatar = author.metadata?.avatar

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/authors"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-600 mb-8"
      >
        ← All authors
      </Link>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-brand-100 flex items-center justify-center flex-shrink-0">
          {avatar ? (
            <img
              src={`${avatar.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
              alt={name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-brand-600">{getInitials(name)}</span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{name}</h1>
          {role && <p className="text-brand-600 font-medium mt-1">{role}</p>}
          {bio && <p className="mt-4 text-gray-600 max-w-2xl">{bio}</p>}
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Posts by {name}
        </h2>
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-gray-600">No posts published yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}