import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  discountPercentage: number;
}

interface CartStore {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  incrementItemQuantity: (id: number) => void;
  decrementItemQuantity: (id: number) => void;
}

// Utility function to calculate totals
const calculateCartTotals = (cartItems: CartItem[]) => {
  const totalPrice = cartItems.reduce(
    (total, currentItem) =>
      total +
      currentItem.price *
        currentItem.quantity *
        (1 - currentItem.discountPercentage / 100),
    0
  );

  const totalItems = cartItems.reduce(
    (total, currentItem) => total + currentItem.quantity,
    0
  );

  return { totalPrice, totalItems };
};

// Zustand store for Cart with persistence
const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,

      // Add or update an item in the cart
      addItem: (item: CartItem) => {
        const cartItems = get().cartItems;
        const existingItem = cartItems.find((i) => i.id === item.id);

        let updatedCart: CartItem[];

        if (existingItem) {
          // If the item already exists, update its quantity
          updatedCart = cartItems.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          // Add a new item to the cart
          updatedCart = [...cartItems, { ...item }];
        }

        const { totalPrice, totalItems } = calculateCartTotals(updatedCart);
        set({ cartItems: updatedCart, totalItems, totalPrice });
      },

      // Remove an item from the cart
      removeItem: (id: number) => {
        const updatedCart = get().cartItems.filter((item) => item.id !== id);

        const { totalPrice, totalItems } = calculateCartTotals(updatedCart);
        set({ cartItems: updatedCart, totalItems, totalPrice });
      },

      // Increment the quantity of an item in the cart
      incrementItemQuantity: (id: number) => {
        const cartItems = get().cartItems;
        const updatedCart = cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );

        const { totalPrice, totalItems } = calculateCartTotals(updatedCart);
        set({ cartItems: updatedCart, totalItems, totalPrice });
      },

      // Decrement the quantity of an item in the cart, and remove it if the quantity reaches 0
      decrementItemQuantity: (id: number) => {
        const cartItems = get().cartItems;
        const updatedCart = cartItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0); // Remove items with a quantity of 0

        const { totalPrice, totalItems } = calculateCartTotals(updatedCart);
        set({ cartItems: updatedCart, totalItems, totalPrice });
      },

      clearCart: () => {
        set({ cartItems: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage, // default: localStorage
    }
  )
);

export default useCartStore;
