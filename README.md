# My Online Store Blog

![App Preview](https://imgix.cosmicjs.com/01e51180-65ed-11f1-8e52-17b2565830aa-autopilot-photo-1555066931-4365d14bab8c-1781220403739.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, fully responsive blog application for "My Online Store" built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse blog posts, explore categories, and meet the authors behind every story.

## Features

- 📝 **Blog Posts** — Browse a beautiful grid of posts with featured images, excerpts, and publish dates
- 🏷️ **Categories** — Filter and explore posts organized by category
- 👤 **Authors** — Dedicated author profiles with bios, roles, avatars, and their published posts
- 🔍 **Single Post View** — Full article view with rich content, author attribution, and category tags
- 🎨 **Modern Design** — Clean, responsive layout with Tailwind CSS and the Inter font
- ⚡ **Server Components** — Fast, SEO-friendly rendering with Next.js App Router
- 📱 **Mobile First** — Looks great on every screen size

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a2b43fdc3293c121782b7ec&clone_repository=6a2b44d1c3293c121782b815)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Online Store". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) — React framework with App Router
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing `authors`, `categories`, and `posts` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set the following environment variables (these are provided automatically when deploying through Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with connected author and categories
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug })
  .depth(1)
```

## Cosmic CMS Integration

This app reads content directly from your Cosmic bucket using these object types:

- **posts** — `excerpt`, `content`, `featured_image`, `publish_date`, `author` (object), `categories` (objects)
- **authors** — `name`, `role`, `bio`, `avatar`
- **categories** — `name`, `description`

Connected objects (author and categories on each post) are resolved automatically using the `depth` parameter. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push your code to a Git repository
2. Import the project into [Vercel](https://vercel.com)
3. Add the `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables
4. Deploy

### Netlify

1. Connect your repository to [Netlify](https://netlify.com)
2. Add the environment variables in Site Settings
3. Deploy

<!-- README_END -->