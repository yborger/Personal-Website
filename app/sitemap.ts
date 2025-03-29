/*
  NOTE: 
  --this will have to be modified, and when it does get modified update pnpm and npm, and audit
  --currently, the posts linked from here are old and so i need to be defaulted on the old version of react
  --but once i change the posts i can update pnpm, audit, and cover my bases

  PORTFOLIO will be the update time forrrrrr:
  -update pnpm/npm audit, etc.
  -change sitemap
  -robots?
  -posts w/in components
  -slug w/in portfolio
  -page in portfolio
  -rss


*/

import { getPosts } from 'app/portfolio/utils'

export const baseUrl = 'https://portfolio-blog-starter.vercel.app'

export default async function sitemap() {
  let posts = getPosts().map((post) => ({
    url: `${baseUrl}/portfolio/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/portfolio'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...posts]
}
