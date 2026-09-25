"use client";

import { urlFor } from "@/lib/image";
import { ImageObject } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  images?: (ImageObject | string | unknown)[];
  isStock?: number;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(images[0]);

  if (!images.length) {
    return (
      <div className="w-full h-96 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 text-xs">
        No image available
      </div>
    );
  }

  const currentImage = active || images[0];
  const currentKey =
    typeof currentImage === "string"
      ? currentImage
      : typeof currentImage === "object" && currentImage !== null && "_key" in currentImage
      ? String((currentImage as { _key?: string })._key)
      : JSON.stringify(currentImage);

  return (
    <div className="w-full space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full aspect-square max-h-[500px] bg-slate-50/70 border border-slate-100 rounded-3xl p-6 flex items-center justify-center overflow-hidden group shadow-xs"
        >
          <Image
            src={urlFor(currentImage).url()}
            alt="product gallery view"
            width={700}
            height={700}
            priority
            className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 ${
              isStock === 0 ? "opacity-50" : ""
            }`}
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => {
            const key =
              typeof image === "string"
                ? image
                : typeof image === "object" && image !== null && "_key" in image
                ? String((image as { _key?: string })._key)
                : index;
            const isSelected = active === image || (!active && index === 0);

            return (
              <button
                key={key}
                type="button"
                className={`relative w-20 h-20 rounded-2xl p-2 bg-slate-50 shrink-0 border-2 cursor-pointer transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? "border-shop_light_blue shadow-md shadow-shop_light_blue/20 scale-105"
                    : "border-slate-100 hover:border-slate-300 opacity-70 hover:opacity-100"
                }`}
                onClick={() => setActive(image)}
              >
                <Image
                  src={urlFor(image).url()}
                  alt={`thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageView;
