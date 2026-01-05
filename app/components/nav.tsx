import Link from 'next/link'

const navItems = {
  '/': {
    name: 'home',
  },
  '/about': {
    name: 'about', //will be moved elsewhere
  },
  '/contact': { //about or contact
    name: 'contact',
  }
  ,'/portfolio': { //will become portfolio section
    name: 'portfolio',
  },
  
}

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="w-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 ... rounded-full lg:sticky lg:top-12">
        
        <nav
          className="container navFull flex flex-row items-start relative md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >          
          <img src="/ybLogo.png" alt="logo" className="logo h-16 w-auto" />

          <div className="navMenu flex flex-row py-4 space-x-0 pr-0">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all cursor-pointer hover:text-neutral-100 dark:hover:text-neutral-400 flex relative px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}
            <button className="lightDark cursor-pointer transition-all hover:text-neutral-100 dark:hover:text-neutral-400 flex relative px-2 m-1 ">☀︎☾</button>
            
<label className="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer"/>

      
  <div className="relative w-9 h-5 bg-neutral-quaternary  peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full
  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
  <span className="select-none ms-3 text-sm font-medium text-heading"></span>
</label>
<label className="flex items-center cursor-pointer select-none text-dark dark:text-white group">
      <div className="relative">
        <input id="2" type="checkbox" className="peer sr-only" />
        <div className="h-5 rounded-full shadow-inner bg-gray-3 dark:bg-dark-2 w-14"></div>
        <div
          className="absolute left-0 transition bg-white rounded-full dot shadow-switch-1 dark:bg-dark-4 -top-1 h-7 w-7 group-has-checked:translate-x-full group-has-checked:bg-primary">
        </div>
      </div>
    </label>

            
          </div>
        </nav>
      </div>
    </aside>
  )
}
