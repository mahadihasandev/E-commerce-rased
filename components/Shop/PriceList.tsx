import React from "react";
import { Title } from "../ui/text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const priceRanges = [
  { title: "Under ৳100", value: "0-100" },
  { title: "৳100 - ৳500", value: "100-500" },
  { title: "৳500 - ৳1000", value: "500-1000" },
  { title: "৳1000 - ৳2000", value: "1000-2000" },
  { title: "৳2000 - ৳5000", value: "2000-5000" },
  { title: "৳5000 - ৳10000", value: "5000-10000" },
  { title: "Over ৳10000", value: "10000-100000" },
];

interface Props {
  selectedPrice: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title
        className="text-base! text-shop_dark_blue/80 uppercase tracking-wide font-sans
         rounded-md px-3 pb-2"
      >
        Price
      </Title>
      <RadioGroup
        value={selectedPrice || ""}
        className="mt-2 space-y-1"
        onValueChange={setSelectedPrice}
      >
        {priceRanges.map((priceRange) => (
          <div
            className="flex items-center space-x-2 hover:cursor-pointer"
            key={priceRange.value}
          >
            <RadioGroupItem
              onClick={() => setSelectedPrice(priceRange.value)}
              value={priceRange.value}
              id={priceRange.value}
              className="rounded-sm shadow-sm shadow-shop_light_blue 
              border-shop_light_blue/20 hover:border-shop_light_blue/70 
              hover:shadow-blue-600 hoverEffect"
            />
            <Label
              className={`text-normal font-sans text-shop_dark_blue 
                hover:text-shop_light_blue hoverEffect hover:underline 
                hover:underline-shop_light_blue hover:cursor-pointer
                ${selectedPrice === priceRange.value && "text-shop_light_blue underline underline-shop_light_blue"}`}
              htmlFor={priceRange.value}
            >
              {priceRange.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedPrice && (
        <button
          onClick={() => setSelectedPrice(null)}
          className="text-shop_dark_blue/80 text-sm pl-20 pt-2 font-semibold
         hover:scale-105 hover:text-red-600 hoverEffect underline tracking-wide"
        >
          Reset Selection
        </button>
      )}
    </div>
  );
};

export default PriceList;
