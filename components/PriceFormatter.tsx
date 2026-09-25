import { cn } from '@/lib/utils';
import React from 'react'

interface Props{
    amount:number|undefined;
    className:string;
}

const PriceFormatter = ({amount,className}:Props) => {
    const formattedPrice=new Number(amount).toLocaleString("en-US",{
        currency:"BDT",
        style:"currency",
        minimumFractionDigits:0,
    })
  return (
    <span className={cn("text-sm font-bold text-darkColor",className)}>
        {formattedPrice}
    </span>
  )
}

export default PriceFormatter