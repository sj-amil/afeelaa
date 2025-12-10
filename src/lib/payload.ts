import { getPayload as getPayloadClient } from 'payload'
import config from '@payload-config'

export const getPayload = async () => {
  return await getPayloadClient({ config })
}

// Helper function to fetch published projects
export async function getPublishedProjects(limit?: number) {
  const payload = await getPayload()
  const projects = await payload.find({
    collection: 'projects',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: limit || 100,
    sort: '-createdAt',
  })
  return projects.docs
}

// Helper function to fetch a single project by slug
export async function getProjectBySlug(slug: string) {
  const payload = await getPayload()
  const projects = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  return projects.docs[0] || null
}

// Helper function to fetch published pages
export async function getPublishedPages() {
  const payload = await getPayload()
  const pages = await payload.find({
    collection: 'pages',
    where: {
      status: {
        equals: 'published',
      },
    },
  })
  return pages.docs
}

// Helper function to fetch a single page by slug
export async function getPageBySlug(slug: string) {
  const payload = await getPayload()
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  return pages.docs[0] || null
}

// Helper function to fetch published blog posts
export async function getPublishedBlogPosts(limit?: number) {
  const payload = await getPayload()
  const posts = await payload.find({
    collection: 'blog-posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: limit || 100,
    sort: '-publishedAt',
  })
  return posts.docs
}

// Helper function to fetch team members
export async function getTeamMembers() {
  const payload = await getPayload()
  const members = await payload.find({
    collection: 'team-members',
    sort: 'order',
  })
  return members.docs
}

// Helper function to fetch testimonials
export async function getTestimonials(featured?: boolean) {
  const payload = await getPayload()
  const testimonials = await payload.find({
    collection: 'testimonials',
    where: featured
      ? {
          featured: {
            equals: true,
          },
        }
      : {},
  })
  return testimonials.docs
}

// Helper function to fetch media by ID
export async function getMediaById(id: string) {
  const payload = await getPayload()
  const media = await payload.findByID({
    collection: 'media',
    id,
  })
  return media
}
