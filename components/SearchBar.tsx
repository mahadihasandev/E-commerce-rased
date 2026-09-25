"use client";

import { BsSearch } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { useSearchProducts } from "@/hooks/useQueries";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/image";
import { Loader2, X } from "lucide-react";
import PriceFormatter from "./PriceFormatter";

const SearchBar = () => {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: searchResults = [], isFetching } =
    useSearchProducts(debouncedQuery);

  const isDebouncing =
    query.trim() !== debouncedQuery.trim() && query.trim().length > 0;
  const loading = (isFetching || isDebouncing) && query.trim().length > 0;
  const products = debouncedQuery.trim() ? searchResults : [];

  const handleSearch = () => {
    setSearch(!search);
    if (!search) {
      setTimeout(() => {
        const input = document.getElementById("search-input");
        input?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch(false);
        setQuery("");
        setDebouncedQuery("");
      }
    };

    if (search) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [search]);

  return (
    <div ref={searchRef} className="relative">
      <BsSearch
        onClick={handleSearch}
        className={`text-shop_dark_blue scale-90 w-5 h-5 cursor-pointer hover:scale-100 hover:text-shop_light_blue hoverEffect ${
          search ? "text-shop_light_blue hidden" : ""
        }`}
      />

      {search && (
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="border border-shop_light_blue shadow-md shadow-shop_light_blue/20 rounded-full px-4 w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-shop_light_blue/50 hoverEffect"
            />
            {query && (
              <X
                onClick={() => {
                  setQuery("");
                  setDebouncedQuery("");
                }}
                className="absolute right-3 w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
              />
            )}
          </div>
          <X
            onClick={() => setSearch(false)}
            className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-500 transition-colors md:hidden"
          />
        </div>
      )}

      {search && (query || loading) && (
        <div className="absolute top-full right-0 mt-3 w-72 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-8 gap-3">
                <Loader2 className="w-8 h-8 text-shop_light_blue animate-spin" />
                <p className="text-sm text-gray-500 font-medium">
                  Searching products...
                </p>
              </div>
            ) : products.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                  Products found ({products.length})
                </div>
                {products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/product/${product.slug?.current}`}
                    onClick={() => {
                      setSearch(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-shop_light_blue/5 transition-colors group"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      {product.images && product.images[0] && (
                        <Image
                          src={urlFor(product.images[0]).url()}
                          alt={product.name || "Product"}
                          fill
                          className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-800 truncate group-hover:text-shop_light_blue transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {product.variant}
                      </p>
                      <div className="mt-1">
                        <PriceFormatter
                          amount={product.price}
                          className="text-shop_light_blue font-bold text-sm"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : query.length > 0 ? (
              <div className="p-8 text-center">
                <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BsSearch className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  No results found for &quot;{query}&quot;
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try checking for typos or use different keywords
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
