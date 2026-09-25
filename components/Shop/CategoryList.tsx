import { Category } from '@/types';
import React from 'react'
import { Title } from '../ui/text';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
interface Props{
    categories:Category[];
    selectedCategory:string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({categories,selectedCategory,setSelectedCategory}:Props) => {
  // console.log(selectedCategory,"selectedCategory");
  
  return (
    <div className='w-full bg-white p-4'>
      <Title className='text-base! text-shop_dark_blue/80 uppercase tracking-wide font-sans
         rounded-md px-3 py-3'>
          Categories
          </Title>
          <RadioGroup value={selectedCategory||""}
          className='mt-2 space-y-1'
          onValueChange={setSelectedCategory}
          >
          {categories.map((category)=>(
            <div className='flex items-center space-x-2 hover:cursor-pointer' key={category._id}>
              <RadioGroupItem 
              onClick={()=>setSelectedCategory(category?.slug?.current as string)} 
              value={category?.slug?.current as string} 
              id={category?.slug?.current}
              className='rounded-sm shadow-sm shadow-shop_light_blue border-shop_light_blue/20 hover:border-shop_light_blue/70 hover:shadow-blue-600 hoverEffect'
              />
              <Label className={`text-normal font-sans text-shop_dark_blue hover:cursor-pointer
                hover:text-shop_light_blue hoverEffect hover:underline hover:underline-shop_light_blue
                ${selectedCategory === category?.slug?.current && 'text-shop_light_blue underline underline-shop_light_blue'}`} htmlFor={category?.slug?.current}>{category?.title}</Label>
            </div>
          ))}
          </RadioGroup>
          {selectedCategory && (
          <button onClick={()=>setSelectedCategory(null)} className='text-shop_dark_blue/80 text-sm pl-20 pt-2 font-semibold
         hover:scale-105 hover:text-red-600 hoverEffect underline tracking-wide'>
          Reset Selection</button>
          )}
    </div>
  )
}

export default CategoryList