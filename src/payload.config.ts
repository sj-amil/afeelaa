import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import {
  Users,
  Media,
  Projects,
  Pages,
  BlogPosts,
  TeamMembers,
  Testimonials,
} from './payload/collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Prymagro CMS',
    },
  },
  collections: [
    Users,
    Media,
    Projects,
    Pages,
    BlogPosts,
    TeamMembers,
    Testimonials,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5001',
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5001',
    `https://${process.env.NEXT_PUBLIC_DOMAIN}`,
    `https://www.${process.env.NEXT_PUBLIC_DOMAIN}`,
    'http://localhost:5001',
    'http://localhost:3000',
  ].filter(Boolean) as string[],
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5001',
    `https://${process.env.NEXT_PUBLIC_DOMAIN}`,
    `https://www.${process.env.NEXT_PUBLIC_DOMAIN}`,
    'http://localhost:5001',
    'http://localhost:3000',
  ].filter(Boolean) as string[],
})
