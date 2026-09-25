'use client'
import { cn } from '@/lib/utils'
import useStore from '@/store'
import { HeartPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const FavoriteButton = ({
 
  className}:{
  className?:string;
}) => {
  const {favoriteProduct}=useStore()
  const pathname = usePathname();
  return (
<>
{favoriteProduct?.length>0?(
        <Link href={"/wishlist"} className={cn(`group relative`,className)}>
      <HeartPlus className='text-shop_dark_blue w-5 h-5 
      group-hover:text-shop_light_blue hoverEffect'/>
      <span className='absolute -top-1 -right-1 bg-red-600 
      text-white h-3.5 w-3.5 rounded-full text-xs p-1 font-semibold 
      flex items-center justify-center scale-90 group-hover:scale-100 
      hoverEffect'>{favoriteProduct?.length?favoriteProduct?.length:0}</span>
      <span
        className={`absolute inset-0 -z-10 bg-blue-200 -left-[39%] -top-2.5 p-5 rounded-2xl w-[150%] 
          scale-0 hoverEffect origin-center ${pathname == "/wishlist" && "scale-100"}`}
      />
    </Link>
):<button className='group relative hover:text-shop_light_blue hoverEffect 
 hover:border-shop_light_blue rounded-md'>
  <HeartPlus className='text-shop_dark_blue w-5 h-5
      group-hover:text-shop_light_blue hoverEffect'/>
</button>
}
</>
  )
}

export default FavoriteButton