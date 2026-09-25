import { productType } from '@/constant/data'
import Link from 'next/link'
import React from 'react'
interface Props{
    selectedTab:string;
    onTabSelect:(tab:string)=>void;
}

const HomeTabBar = ({selectedTab,onTabSelect}:Props) => {
  return (
    <div className='flex justify-between items-center md:gap-5 '>
        <div className='flex items-center flex-wrap gap-3 md:gap-5 font-semibold text-sm'>
            {
                productType.map((item)=>(
                    <button onClick={()=>(onTabSelect(item?.title))} className={`border font-poppins border-shop_light_blue/30 px-3 py-1.5 md:px-6 md:py-2 hover:bg-shop_light_blue hover:border-shop_light_blue rounded-full hover:text-white hoverEffect 
                        ${selectedTab==item?.title?"bg-shop_light_blue text-white border-shop_light_blue":"bg-shop_light_blue/25"}`} key={item?.title}>{item?.title}</button>
                ))
            }
        </div>
        <Link className='border text-sm font-semibold font-poppins border-shop_light_blue/25 px-5 py-1 md:px-6 md:py-2 hover:bg-shop_light_blue hover:border-shop_light_blue rounded-full hover:text-white hoverEffect' href={'/shop'}>SeeAll</Link>
    </div>
  )
}

export default HomeTabBar