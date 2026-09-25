'use client'
import { headerData } from '@/constant/data'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderMenu = () => {
  const pathname=usePathname()
  
  
  return (
    <div className='hidden md:inline-flex items-center justify-center capitalize z-10 font-semibold text-shop_dark_blue gap-8'>
        {headerData.map((item)=>(
            <Link key={item.title} href={item?.href}
            className={`hover:text-white hoverEffect relative group z-10 transition-colors duration-300 isolate ${pathname==item?.href&&'text-white'}`}
            >
            {item.title}
            <span className={`absolute inset-0 -z-10 bg-shop_light_blue -left-[25%] -top-2 p-5 rounded-2xl w-[150%] scale-0 group-hover:scale-100 transition-transform duration-300 origin-center ${pathname==item?.href&&"scale-100"}`}/>
            </Link>
        ))}
    </div>
  )
}

export default HeaderMenu