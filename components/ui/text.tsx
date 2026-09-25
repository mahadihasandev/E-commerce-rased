import { cn } from '@/lib/utils'
import React from 'react'

const Title = ({children,className}:{children:React.ReactNode,className:string}) => {
  return (
    <h2 className={cn('md:text-3xl text-xs font-bold text-blue-800 capitalize tracking-wide',className)}>{children}</h2>
  )
}

const SubTitle = ({children,className}:{children:React.ReactNode,className:string}) => {
  return (
    <h3 className={cn('font-bold text-base text-gray-900 font-sans',className)}>{children}</h3>
  )
}

const SubText=({children,className}:{children:React.ReactNode,className:string})=>{
  return(
    <p className={cn('text-gray-600 font-poppins text-sm',className)}>{children}</p>
  )
}

export {Title,SubText,SubTitle}