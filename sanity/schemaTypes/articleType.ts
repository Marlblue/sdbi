import { defineField, defineType } from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Artikel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (untuk URL)',
      type: 'slug',
      description: 'Huruf kecil, pisahkan kata dengan tanda hubung. Contoh: cara-menaikkan-omzet-umkm',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Tanggal',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan Singkat',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Isi Artikel',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Gambar Utama',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      initialValue: 'Uncategorized',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Tag ini akan tampil sebagai link yang bisa diklik di halaman artikel, mengarah ke /blog yang sudah difilter per tag.',
    }),
    defineField({
      name: 'readTime',
      title: 'Estimasi Waktu Baca',
      type: 'string',
      initialValue: '5 MENIT BACA',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'seoTitle',
          title: 'SEO Title',
          type: 'string',
          description: 'Override judul yang tampil di tab browser & hasil pencarian Google. Kosongkan untuk pakai Judul di atas.',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          description: '150-160 karakter. Kosongkan untuk pakai Ringkasan Singkat.',
        }),
        defineField({
          name: 'focusKeyword',
          title: 'Focus Keyword',
          type: 'string',
        }),
        defineField({
          name: 'secondaryKeywords',
          title: 'Secondary Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
        }),
        defineField({
          name: 'imageAlt',
          title: 'Alt Text Gambar Utama',
          type: 'string',
          description: 'Kosongkan untuk pakai Judul.',
        }),
        defineField({
          name: 'ogTitle',
          title: 'OG Title (Facebook)',
          type: 'string',
        }),
        defineField({
          name: 'ogDescription',
          title: 'OG Description (Facebook)',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'twitterTitle',
          title: 'Twitter Title',
          type: 'string',
        }),
        defineField({
          name: 'twitterDescription',
          title: 'Twitter Description',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'faq',
          title: 'FAQ',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'faqItem',
              fields: [
                defineField({ name: 'question', title: 'Pertanyaan', type: 'string' }),
                defineField({ name: 'answer', title: 'Jawaban', type: 'text', rows: 3 }),
              ],
              preview: {
                select: { title: 'question' },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
