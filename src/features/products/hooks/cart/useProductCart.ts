import { useState } from "react";
import { Product } from "../../../../interface/products";
import useCartStore from "../../../../stores/useCartStore";

export const useProductCart = (product: Product | undefined) => {
  const inCart = useCartStore((state) =>
    state?.cartItems?.some((i) => i.id === product?.id)
  );
  const carts = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addItem);
  const decrement = useCartStore((state) => state.decrementItemQuantity);
  const increment = useCartStore((state) => state.incrementItemQuantity);

  const [isImageLoading, setIsImageLoading] = useState(true);
  if (!product) return;

  const qty = carts?.find((i) => i.id === product.id)?.quantity;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      discountPercentage: product.discountPercentage,
      image: product.thumbnail,
    });
  };

  const handleIncrement = () => {
    increment(product.id);
  };

  const handleDecrement = () => {
    decrement(product.id);
  };

  return {
    qty,
    isImageLoading,
    setIsImageLoading,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    inCart,
  };
};
