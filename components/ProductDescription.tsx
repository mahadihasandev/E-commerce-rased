import { Product } from "@/types";
import RichTextRenderer from "./RichTextRenderer";

interface Props {
  product: Product | null | undefined;
}

const ProductDescription = ({ product }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold font-poppins text-slate-900 border-b border-slate-100 pb-3">
        Detailed Product Overview
      </h3>
      <div className="text-sm md:text-base text-slate-600 font-poppins tracking-wide leading-relaxed">
        {product?.description ? (
          <RichTextRenderer content={product.description} />
        ) : (
          <p className="text-slate-400 italic">No detailed description available for this item.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
