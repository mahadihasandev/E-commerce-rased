"use client"
import React, { useState } from 'react'
import useStore from '@/store'
import Container from './Container'
import { Button } from './ui/button'
import Link from 'next/link'
import { FaHeartPulse } from 'react-icons/fa6'
import { Product } from '@/types'
import { XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { urlFor } from '@/lib/image'
import AddToCartButton from './AddToCartButton'

const WishListProducts = () => {
    const [visibleProduct,setVisibleProduct]=useState(7)
    const {favoriteProduct,removeFromFavorite,resetFavorite}=useStore()
    const loadMore=()=>{
        
      setVisibleProduct((prev)=>Math.min(prev+5,favoriteProduct?.length))
    }
    const handleClearWishlist=()=>{
      if(window.confirm("Are you sure you want to clear your wishlist?")){
        resetFavorite()
        toast.success("Wishlist cleared")
      }
    }
  return (
    <Container>
        {favoriteProduct?.length>0?(
          <>
            <div className='overflow-x-auto'>
                <table className='w-full border'>
                    <thead className='shadow-md'>
                        <tr className='shadow-md border'>
                            <th className='p-2 text-left'>Image</th>
                            <th className='p-2 text-left'>Name</th>
                            <th className='p-2 text-left hidden md:table-cell'>Category</th>
                            <th className='p-2 text-left hidden md:table-cell'>Type</th>
                            <th className='p-2 text-left hidden md:table-cell'>Status</th>
                            <th className='p-2 text-left'>Price</th>
                            <th className='p-2 text-center md:text-left'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favoriteProduct.slice(0,visibleProduct).map((product:Product)=>{
                            return(
                                <tr className='shadow' key={product._id}>
                                  <td className='px-2 py-4 flex items-center gap-2'>
                                    <XCircle onClick={()=>{removeFromFavorite(product._id)
                                      toast.success("Product removed from wishlist")
                                    }} size={25} className='text-red-400 hover:scale-110 hover:text-red-500 cursor-pointer hoverEffect'/>
                                    {product?.images &&
                                      <Link
                                        href={`/product/${product.slug?.current}`}
                                        prefetch={true}
                                        className="border rounded-md group hidden md:inline-flex"
                                      >
                                    <Image src={urlFor(product?.images[0]).url()} 
                                    width={80}
                                    height={80}
                                    alt='productImage'
                                    className='object-contain rounded-md 
                                    group-hover:scale-105 h-20 w-20 hoverEffect'
                                    />
                                    </Link>}
                                   
                                  </td>
                                  <td>
                                    <Link
                                      href={`/product/${product.slug?.current}`}
                                      prefetch={true}
                                      className="hover:text-shop_light_blue transition-colors"
                                    >
                                      <p className="line-clamp-1 text-sm font-medium">{product.name}</p>
                                    </Link>
                                  </td>
                                  <td className='hidden capitalize p-2 md:table-cell'>
                                    {product?.categories&&(
                                      <p className='line-clamp-1 uppercase text-xs font-medium'>{product?.categories?.map((category)=>category).join(", ")}</p>
                                    )}
                                  </td>
                                  <td className='hidden capitalize p-2 md:table-cell'>
                                    {product?.variant}
                                  </td>
                                  <td className={`hidden capitalize p-2 md:table-cell font-semibold ${(product?.stock as number)>0?"text-green-500":"text-red-500"}`}>
                                    {product?.stock as number>0?"In Stock":"Out of Stock"}
                                  </td>
                                  <td className='capitalize font-semibold p-2'>
                                    {product?.price}
                                  </td>
                                  <td className='p-2'>
                                    <AddToCartButton product={product}/>
                                  </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-between'>
              {favoriteProduct.length>0 && <Button 
              variant={"destructive"} 
              className='hoverEffect font-sans font-semibold'
              onClick={handleClearWishlist}>Clear Wishlist</Button>}
              {visibleProduct<favoriteProduct?.length && (
              <div className=' my-6'>
              
              <Button variant={"outline"} className='hoverEffect font-sans font-semibold' onClick={loadMore}>Load More</Button>
            </div>
            )}
            
            {visibleProduct>8 && (
              <div className=' my-6'>
              <Button variant={"outline"} className='hoverEffect font-sans font-semibold' onClick={()=>setVisibleProduct(10)}>Load Less</Button>
            </div>
            )}
            </div>
            </>
            ):(
            <div className="flex min-h-[700px] flex-col items-center justify-center space-y-6 px-4 text-center">
          <div className="relative mb-4">
            <div className="absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full bg-muted-foreground/20" />
            <FaHeartPulse
              className="h-12 w-12"
              strokeWidth={2}
              fill='red'
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-muted-foreground">
              Items added to your wishlist will appear here
            </p>
          </div>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
        )}
    </Container>
  )
}

export default WishListProducts