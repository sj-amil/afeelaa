import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'startDate',
      type: 'date',
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'investment',
      type: 'group',
      fields: [
        {
          name: 'targetAmount',
          type: 'number',
        },
        {
          name: 'currentAmount',
          type: 'number',
        },
        {
          name: 'minimumInvestment',
          type: 'number',
        },
        {
          name: 'expectedReturn',
          type: 'number',
          admin: {
            description: 'Expected return percentage',
          },
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Agriculture', value: 'agriculture' },
        { label: 'Livestock', value: 'livestock' },
        { label: 'Aquaculture', value: 'aquaculture' },
        { label: 'Processing', value: 'processing' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
}
