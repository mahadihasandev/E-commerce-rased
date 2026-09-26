"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import useStore from "@/store";
import toast from "react-hot-toast";
import { FaHeartCirclePlus } from "react-icons/fa6";

const AddToWishListButton = ({
  product,
  className,
}: {
  product: Product;
  className: string;
}) => {
  const { addToFavorite, favoriteProduct } = useStore();
  
  const availableProduct = favoriteProduct.find(
    (item) => item._id === product._id,
  );
 
   
  
  const handleFavorite = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if(product._id){
      addToFavorite(product)
      .then(() => {
        toast.success(availableProduct? `${product.name?.substring(0,15)} removed from wishlist`:`${product.name?.substring(0,15)} added to wishlist`);
      })
    }
  };
  return (
    <div className={cn("", className)}>
      <div
        onClick={handleFavorite}
        className={`p-2.5 rounded-full cursor-pointer text-shop_dark_blue bg-blue-100 hover:bg-blue-300 hover:text-red-400 hoverEffect ${availableProduct&&"bg-blue-300 text-red-400!"}`}
      >
        <FaHeartCirclePlus size={19} />
      </div>
    </div>
  );
};

export default AddToWishListButton;
