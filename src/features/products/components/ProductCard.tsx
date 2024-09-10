import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Rating,
  Skeleton,
  Text,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../../interface/products";
import { useProductCart } from "../hooks/cart/useProductCart";

interface ProductCardProps {
  product: Product;
  inCart: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, inCart }) => {
  const cart = useProductCart(product);

  // {
  //   qty,
  //   isImageLoading,
  //   setIsImageLoading,
  //   handleAddToCart,
  //   handleIncrement,
  //   handleDecrement,
  // }
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      my={12}
      className="product-card"
    >
      <Link
        to={`/products/${product.id}`}
        style={{ textDecoration: "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card.Section>
          {cart?.isImageLoading && (
            <Skeleton
              h={{ base: 160, md: 200, lg: 240, xl: 280 }}
              radius="md"
            />
          )}
          <Image
            src={product.thumbnail}
            alt={product.title}
            h={{ base: 160, md: 200, lg: 240, xl: 280 }}
            fit="contain"
            onLoad={() => cart?.setIsImageLoading(false)}
            style={{ display: cart?.isImageLoading ? "none" : "block" }}
          />
        </Card.Section>

        <Group p="apart" mt="md" mb="xs">
          <Text fw={500} size="lg" lineClamp={1}>
            {product.title}
          </Text>
        </Group>
        <Group justify="space-between" p="apart" mt="md" mb="xs">
          {product.discountPercentage && (
            <Badge color="pink" variant="light">
              {product.discountPercentage}% OFF
            </Badge>
          )}
          <Text size="sm" c="dimmed">
            ${product.price.toFixed(2)}
          </Text>
        </Group>

        <Flex align={"center"} mt="md" justify={"space-between"}>
          <Flex align={"center"} gap={3}>
            <Text size="xs">{product.rating.toFixed(1)}</Text>
            <Rating value={product.rating} fractions={2} readOnly size="xs" />
          </Flex>
          <Text
            size="xs"
            c={product.availabilityStatus === "In Stock" ? "green" : "red"}
            fw={500}
          >
            {product.availabilityStatus}
          </Text>
        </Flex>
      </Link>

      <Group my={"md"} grow justify="space-between" align="center">
        <Button
          w={"30%"}
          variant={inCart ? "filled" : "light"}
          color={inCart ? "green" : "blue"}
          radius="md"
          leftSection={
            <Flex align={"center"} gap={3}>
              <IconShoppingCart size={16} /> {cart?.qty && cart?.qty}
            </Flex>
          }
          onClick={(e) => {
            e.preventDefault();
            cart?.handleAddToCart();
          }}
          disabled={product.availabilityStatus !== "In Stock"}
        >
          {inCart
            ? "In Cart"
            : product.availabilityStatus === "In Stock"
            ? "Add to Cart"
            : "Out of Stock"}
        </Button>
      </Group>

      {cart?.qty && (
        <Flex gap={"md"}>
          <Button
            radius={"md"}
            variant={"filled"}
            color="green"
            onClick={cart?.handleIncrement}
          >
            +
          </Button>
          <Flex align={"center"}>{cart?.qty}</Flex>
          <Button
            radius={"md"}
            variant={"filled"}
            color="green"
            onClick={cart?.handleDecrement}
          >
            -
          </Button>
        </Flex>
      )}
    </Card>
  );
};

export default ProductCard;
