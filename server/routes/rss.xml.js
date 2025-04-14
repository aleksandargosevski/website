import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import RSS from 'rss'

export default defineEventHandler(async (event) => {
  event.node.res.setHeader('content-type', 'application/xml')
  const posts = await queryCollection(event, 'content').all()
  const config = useRuntimeConfig(event).public.globals

  const feed = new RSS({
    title: config.name,
    description: config.description,
    feed_url: `https://${config.url}/rss.xml`,
    link: `https://${config.url}`,
    site_url: `https://${config.url}`,
    copyright: '2007-2025 Aleksandar Goševski',
    language: 'en',
  })

  for (const post of posts) {
    const relativePath = post.path.startsWith('/') ? post.path.substring(1) : post.path
    const filePath = path.join(process.cwd(), 'content', `${relativePath}.md`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const contentWithoutFrontmatter = fileContent.replace(/^---[\s\S]*?---/m, '')
    const htmlContent = marked.parse(contentWithoutFrontmatter)

    feed.item({
      title: post.title,
      description: htmlContent,
      url: `https://${config.url}${post.path}`,
      categories: post.tags,
      date: post.createdAt,
    })
  }

  const xml = feed.xml()
  return xml
})
