import { getAllCategories, getMetafieldValue } from '@/lib/cosmic'
import Link from 'next/link'

export const revalidate = 60

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Categories</h1>
      <p className="mt-2 text-gray-600">Browse posts by topic.</p>

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🏷️</p>
          <p className="text-gray-600">No categories available yet.</p>
        </div>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const name = getMetafieldValue(category.metadata?.name) || category.title
            const description = getMetafieldValue(category.metadata?.description)
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group block bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏷️</span>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {name}
                  </h2>
                </div>
                {description && (
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">{description}</p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}