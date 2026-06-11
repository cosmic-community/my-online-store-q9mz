import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { getInitials } from '@/lib/utils'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const role = getMetafieldValue(author.metadata?.role)
  const bio = getMetafieldValue(author.metadata?.bio)
  const avatar = author.metadata?.avatar

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group block bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
    >
      <div className="mx-auto w-20 h-20 rounded-full overflow-hidden bg-brand-100 flex items-center justify-center">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xl font-bold text-brand-600">{getInitials(name)}</span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
        {name}
      </h3>
      {role && <p className="text-sm text-brand-600 font-medium">{role}</p>}
      {bio && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{bio}</p>}
    </Link>
  )
}