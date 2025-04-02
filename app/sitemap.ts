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
export const baseUrl = 'https://portfolio-blog-starter.vercel.app'

export default async function sitemap() {
  // Manually define case study folders here
  const caseStudySlugs = [
    'example',  // Add the slugs of each case study
  ]

  // Create URLs for each case study page
  const posts = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/portfolio/cases/${slug}`,
  }))

  // Define other routes (home and portfolio page)
  const routes = ['', '/portfolio'].map((route) => ({
    url: `${baseUrl}${route}`,
  }))

  return [...routes, ...posts]
}
