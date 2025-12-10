import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'subheading',
          type: 'text',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'sectionType',
          type: 'select',
          options: [
            { label: 'Text Block', value: 'textBlock' },
            { label: 'Image Gallery', value: 'imageGallery' },
            { label: 'CTA Section', value: 'cta' },
            { label: 'Feature List', value: 'featureList' },
          ],
        },
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'images',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'imageGallery',
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'ctaLink',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'cta',
          },
        },
        {
          name: 'ctaText',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'cta',
          },
        },
        {
          name: 'features',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.sectionType === 'featureList',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Icon name or class',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
