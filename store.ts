import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

/**
 * Represents a single item in the shopping cart.
 */
export interface CartItem {
  /** The actual product data */
  product: Product;
  /** The quantity of this product in the cart */
  quantity: number;
}

/**
 * Zustand global store state definition for managing Cart and Favorites.
 */
interface StoreState {
  // --- Cart State & Actions ---
  /** List of items currently in the cart */
  items: CartItem[];
  /** Add a product to the cart or increment its quantity if already present */
  addItem: (product: Product) => void;
  /** Decrement a product's quantity or remove it entirely if quantity reaches 0 */
  removeItem: (productId: string) => void;
  /** Completely remove a product from the cart regardless of its quantity */
  deleteCartProduct: (productId: string) => void;
  /** Empty the entire cart */
  resetCart: () => void;
  /** Get the total price of all items in the cart (ignoring discounts) */
  getTotalPrice: () => number;
  /** Get the total price after applying product discounts */
  getSubtotalPrice: () => number;
  /** Get the current quantity of a specific product in the cart */
  getItemCount: (productId: string) => number;
  /** Retrieve all current cart items */
  getGroupedItem: () => CartItem[];

  // --- Favorites State & Actions ---
  /** List of user's favorite products */
  favoriteProduct: Product[];
  /** Toggle a product in the favorites list (add if missing, remove if present) */
  addToFavorite: (product: Product) => Promise<void>;
  /** Explicitly remove a product from favorites */
  removeFromFavorite: (productId: string) => void;
  /** Clear all favorite products */
  resetFavorite: () => void;
}

/**
 * Custom hook to access the global Zustand store.
 * Uses the `persist` middleware to save cart and favorite data to local storage,
 * maintaining state across page reloads.
 */
const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteProduct: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id,
          );
          if (existingItem) {
            // Increment quantity if item already exists
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            // Add new item with quantity 1
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              // Decrease quantity, but keep in cart if > 1
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              // Keep other items unchanged
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),

      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(({ product }) => product._id !== productId),
        })),

      resetCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0,
        );
      },

      getSubtotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const discountedPrice = price - discount;

          // Accumulate price based on discounted value
          return total + discountedPrice * item.quantity;
        }, 0);
      },

      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      getGroupedItem: () => get().items,

      addToFavorite: (product: Product) => {
        return new Promise<void>((resolve) => {
          set((state: StoreState) => {
            const isFavorite = state.favoriteProduct.some(
              (item) => item._id === product._id,
            );
            return {
              // Toggle favorite status
              favoriteProduct: isFavorite
                ? state.favoriteProduct.filter(
                    (item) => item._id !== product._id,
                  )
                : [...state.favoriteProduct, { ...product }],
            };
          });
          resolve();
        });
      },

      removeFromFavorite: (productId: string) => {
        set((state: StoreState) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) => item?._id !== productId,
          ),
        }));
      },

      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
    }),

    {
      name: "cart-store", // Local storage key name
    },
  ),
);

export default useStore;
