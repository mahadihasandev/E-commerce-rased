import { Product } from '@/types'
import useStore from '@/store'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Props{
  product:Product;
  className?:string;
}
const QuantityButton = ({product,className}:Props) => {
  const {addItem,removeItem,getItemCount}=useStore()
  const itemCount=getItemCount(product._id)
  const isOutOfStock=product.stock==0
  const handleRemoveProduct=()=>{
    removeItem(product._id)
    if(itemCount>1){
      
      toast.success('Quantity Decreased')     
    }else{
      toast.success(`${product.name?.substring(0,15)} removed from cart`)     
    }
  }
  const handleAddProduct=()=>{
    if((product.stock as number)>itemCount){
      addItem(product)
      toast.success('Quantity Increased')     
    }else{
      toast.error("Cant't add more then stock")
    }
  }
  return (
    <div className={cn(`flex items-center gap-2 pb-1 rounded-xl border border-shop_light_blue/50 px-3 py-1 my-1`,className)}>
      <button disabled={itemCount==0||isOutOfStock} onClick={handleRemoveProduct}>
        <FaMinusCircle size={17} className='text-shop_light_blue hover:text-red-500 hoverEffect' />
      </button>
      <span className='font-semibold font-sm w-3 text-center text-darkColor'>{itemCount}</span>
      <button disabled={isOutOfStock} onClick={handleAddProduct}>
        <FaPlusCircle size={17} className='text-shop_light_blue hover:text-green-500 hoverEffect' />
      </button>
    </div>
  )
}

export default QuantityButton