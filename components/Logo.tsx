import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Logo = ({className,spanDesign}:{className?:string,spanDesign?:string}) => {
  return (
    <Link className='inline-flex' href={'/'}>
    <h2 className={cn("text-2xl text-shop_dark_blue font-black tracking-wide uppercase hover:text-shop_light_blue group font-sans",
        className)}>
        Aura
        <span className={cn('text-shop_light_blue group-hover:text-shop_dark_blue hoverEffect',spanDesign)}>Shop</span>
    </h2>
    </Link>
  )
}

export default Logo