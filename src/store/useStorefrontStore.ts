"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  color: string;
  pricePaise: number;
  compareAtPricePaise?: number;
  quantity: number;
}

interface StorefrontState {
  cart: CartItem[];
  wishlistIds: string[];
  cartDrawerOpen: boolean;
  wishlistDrawerOpen: boolean;
  searchModalOpen: boolean;

  setCartDrawerOpen: (open: boolean) => void;
  setWishlistDrawerOpen: (open: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;

  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;

  toggleWishlist: (productId: string) => boolean;
}

export const useStorefrontStore = create<StorefrontState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlistIds: [],
      cartDrawerOpen: false,
      wishlistDrawerOpen: false,
      searchModalOpen: false,

      setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
      setWishlistDrawerOpen: (open) => set({ wishlistDrawerOpen: open }),
      setSearchModalOpen: (open) => set({ searchModalOpen: open }),

      addToCart: (item) => {
        const qtyToAdd = item.quantity ?? 1;
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (entry) =>
              entry.productId === item.productId &&
              entry.size === item.size &&
              entry.color === item.color
          );
          if (existingIndex >= 0) {
            const updated = [...state.cart];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + qtyToAdd,
            };
            return { cart: updated };
          }
          return {
            cart: [
              ...state.cart,
              {
                productId: item.productId,
                slug: item.slug,
                name: item.name,
                image: item.image,
                size: item.size,
                color: item.color,
                pricePaise: item.pricePaise,
                compareAtPricePaise: item.compareAtPricePaise,
                quantity: qtyToAdd,
              },
            ],
          };
        });
      },

      removeFromCart: (productId, size, color) =>
        set((state) => ({
          cart: state.cart.filter(
            (entry) =>
              !(
                entry.productId === productId &&
                entry.size === size &&
                entry.color === color
              )
          ),
        })),

      updateQuantity: (productId, size, color, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter(
                (entry) =>
                  !(
                    entry.productId === productId &&
                    entry.size === size &&
                    entry.color === color
                  )
              ),
            };
          }
          return {
            cart: state.cart.map((entry) =>
              entry.productId === productId &&
              entry.size === size &&
              entry.color === color
                ? { ...entry, quantity }
                : entry
            ),
          };
        }),

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (productId) => {
        const exists = get().wishlistIds.includes(productId);
        set((state) => ({
          wishlistIds: exists
            ? state.wishlistIds.filter((id) => id !== productId)
            : [...state.wishlistIds, productId],
        }));
        return !exists;
      },
    }),
    {
      name: "kutti-udupp-store-v1",
      partialize: (state) => ({
        cart: state.cart,
        wishlistIds: state.wishlistIds,
      }),
    }
  )
);
