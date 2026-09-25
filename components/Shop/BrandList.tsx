import { Brand } from '@/types';
import React from 'react'
import { Title } from '../ui/text';
import {RadioGroup , RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
interface Props{
    brands:Brand[];
    selectedBrand:string | null;
    setSelectedBrand:React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({brands,selectedBrand,setSelectedBrand}:Props) => {
  return (
    <div className='w-full bg-white p-5'>
      <Title className='text-base! text-shop_dark_blue/80 uppercase 
      tracking-wide font-sans rounded-md px-3 pb-2'>
          Brand
          </Title>
          <RadioGroup value={selectedBrand||""}
          className='mt-2 space-y-1'
          onValueChange={setSelectedBrand}
          >
          {brands.map((brand)=>(
            <div className='flex items-center space-x-2 hover:cursor-pointer' key={brand._id}>
              <RadioGroupItem 
              onClick={()=>setSelectedBrand(brand?.slug?.current as string)} 
              value={brand?.slug?.current as string} 
              id={brand?.slug?.current}
              className='rounded-sm shadow-sm shadow-shop_light_blue 
              border-shop_light_blue/20 hover:border-shop_light_blue/70 
              hover:shadow-blue-600 hoverEffect'
              />
              <Label className={`text-normal font-sans text-shop_dark_blue 
              hover:cursor-pointer hover:text-shop_light_blue hoverEffect 
              hover:underline hover:underline-shop_light_blue
                ${selectedBrand === brand?.slug?.current && 'text-shop_light_blue underline underline-shop_light_blue'}`} htmlFor={brand?.slug?.current}>{brand?.title}</Label>
            </div>
          ))}
          </RadioGroup>
          {selectedBrand && (
          <button onClick={()=>setSelectedBrand(null)} className='text-shop_dark_blue/80 text-sm pl-20 pt-2 font-semibold
         hover:scale-105 hover:text-red-600 hoverEffect underline tracking-wide'>
          Reset Selection</button>
          )}
    </div>
  )
}

export default BrandList