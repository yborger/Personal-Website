import Link from 'next/link'

const navItems = {
  '/': {
    name: 'home',
  },
  '/contact': { //about or contact
    name: 'contact',
  }
  ,'/portfolio': { //will become portfolio section
    name: 'portfolio',
  },
  'https://vercel.com/templates/next.js/portfolio-starter-kit': {
    name: '[template link]', //will be moved elsewhere
  },
}

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 ... rounded-full lg:sticky lg:top-12">
        
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >          
        <img src="/ybLogo.png" alt="Logo" className="h-10 w-auto hover:animate-spin" />

          <div className="flex flex-row space-x-0 pr-0">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-100 dark:hover:text-neutral-400 flex items-center relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
