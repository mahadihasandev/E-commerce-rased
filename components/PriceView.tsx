import React from 'react';
import PriceFormatter from './PriceFormatter';
import { cn } from '@/lib/utils';

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

const PriceView = ({ price, discount, className }: Props) => {
  return (
    <div className={cn('flex items-center gap-2 overflow-hidden', className)}>
      <PriceFormatter amount={price} className="text-shop_dark_blue" />
      {price && discount && (
        <PriceFormatter
          className="line-through font-normal text-shop_light_text"
          amount={price + (discount * price) / 100}
        />
      )}
    </div>
  );
};

export default PriceView;