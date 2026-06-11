import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <span className="font-semibold text-gray-900">My Online Store Blog</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-600 hover:text-brand-600">
              Posts
            </Link>
            <Link href="/categories" className="text-sm text-gray-600 hover:text-brand-600">
              Categories
            </Link>
            <Link href="/authors" className="text-sm text-gray-600 hover:text-brand-600">
              Authors
            </Link>
          </nav>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          &copy; {year} My Online Store. All rights reserved.
        </p>
      </div>
    </footer>
  )
}