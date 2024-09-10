import { Carousel } from "@mantine/carousel";
import {
  Accordion,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Rating,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconShoppingCart, IconTrashFilled } from "@tabler/icons-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ReviewCard } from "../../../components/common/Comment";
import { Review } from "../../../interface/products";
import useCartStore from "../../../stores/useCartStore";
import { useProductCart } from "../hooks/cart/useProductCart";
import { useGetSingleProduct } from "../hooks/useGetSingleProduct";

const ProductDetails = () => {
  const productId = useParams().productId;
  const { data: productData } = useGetSingleProduct(Number(productId));
  const [isLoaded, setIsLoaded] = useState(true);
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const cart = useProductCart(productData);
  const removeCartItem = useCartStore((s) => s.removeItem);

  return (
    <Box p={{ base: "md", md: "xl" }}>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Box>
            <Carousel
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
            >
              {productData?.images.map((image: string, idx: number) => {
                return (
                  <Carousel.Slide key={idx}>
                    {isLoaded && <Skeleton height={800} radius="md" />}
                    <Image
                      src={image}
                      alt={productData?.title}
                      fit="contain"
                      mah={800}
                      onLoad={() => setIsLoaded(false)}
                      style={{ display: isLoaded ? "none" : "block" }}
                      radius="md"
                    />
                  </Carousel.Slide>
                );
              })}

              {/* ...other slides */}
            </Carousel>
          </Box>
        </Grid.Col>

        <Grid.Col
          style={{ alignSelf: "center" }}
          span={{ base: 12, md: 6, lg: 6 }}
        >
          <Box>
            <Group p="apart">
              <Title order={2}>{productData?.title}</Title>
              <Badge
                color={
                  productData?.availabilityStatus === "In Stock"
                    ? "green"
                    : "red"
                }
              >
                {productData?.availabilityStatus}
              </Badge>
            </Group>

            <Text c="dimmed">{productData?.category}</Text>

            <Group mt="sm">
              {productData?.discountPercentage && (
                <Badge color="pink">
                  {productData?.discountPercentage}% OFF
                </Badge>
              )}
              <Text size="lg" fw={500}>
                ${productData?.price.toFixed(2)}
              </Text>
            </Group>

            <Flex align="center" mt="md" gap={5}>
              <Rating value={productData?.rating} readOnly />
              <Text size="sm" color="dimmed">
                ({productData?.rating.toFixed(1)})
              </Text>
            </Flex>

            <Text mt="md" size="sm" color="dimmed" lineClamp={4}>
              {productData?.description}
            </Text>

            <Group mt="md" gap="xs">
              {productData?.tags.map((tag: string, idx: number) => (
                <Badge key={idx}>{tag}</Badge>
              ))}
            </Group>

            {cart?.qty ? (
              <Button
                mt="lg"
                variant="light"
                color="red"
                radius="md"
                onClick={() => removeCartItem(Number(productData?.id))}
                leftSection={<IconTrashFilled size={16} />}
                disabled={productData?.availabilityStatus !== "In Stock"}
                fullWidth
              >
                Remove from cart
              </Button>
            ) : (
              <Button
                mt="lg"
                variant="light"
                color="blue"
                radius="md"
                onClick={cart?.handleAddToCart}
                leftSection={<IconShoppingCart size={16} />}
                disabled={productData?.availabilityStatus !== "In Stock"}
                fullWidth
              >
                {productData?.availabilityStatus === "In Stock"
                  ? "Add to Cart"
                  : "Out of Stock"}
              </Button>
            )}

            {cart?.qty && (
              <Flex align={"center"} mt={"lg"}>
                <Button
                  radius={"md"}
                  variant={"light"}
                  color="blue"
                  onClick={cart?.handleIncrement}
                >
                  +
                </Button>
                <Text w={50} ta={"center"}>
                  {cart.qty}
                </Text>
                <Button
                  radius={"md"}
                  variant={"light"}
                  color="blue"
                  onClick={cart?.handleDecrement}
                >
                  -
                </Button>
              </Flex>
            )}
          </Box>
        </Grid.Col>
      </Grid>

      <Divider my="lg" />

      <SimpleGrid spacing="lg" cols={{ base: 1, sm: 2, lg: 5 }}>
        <Stack>
          <Title order={4}>Product Details</Title>
          <Group>
            <Text fw={500}>Brand:</Text>
            <Text>{productData?.brand || "N/A"}</Text>
          </Group>
          <Group>
            <Text fw={500}>SKU:</Text>
            <Text>{productData?.sku}</Text>
          </Group>
          <Group>
            <Text fw={500}>Weight:</Text>
            <Text>{productData?.weight} kg</Text>
          </Group>
          <Group>
            <Text fw={500}>Dimensions:</Text>
            <Text>
              {productData?.dimensions.width} x {productData?.dimensions.height}{" "}
              x {productData?.dimensions.depth} cm
            </Text>
          </Group>
          <Group>
            <Text fw={500}>Stock:</Text>
            <Text>{productData?.stock} available</Text>
          </Group>
        </Stack>

        <Stack>
          <Title order={4}>Additional Information</Title>
          <Group>
            <Text fw={500}>Warranty:</Text>
            <Text>{productData?.warrantyInformation}</Text>
          </Group>
          <Group>
            <Text fw={500}>Shipping:</Text>
            <Text>{productData?.shippingInformation}</Text>
          </Group>
          <Group>
            <Text fw={500}>Return Policy:</Text>
            <Text>{productData?.returnPolicy}</Text>
          </Group>
        </Stack>
      </SimpleGrid>

      <Divider my="lg" />

      <Title order={3} mb="md">
        Reviews
      </Title>
      <Accordion>
        {productData?.reviews?.map((review: Review, idx: number) => (
          <ReviewCard key={idx} {...review} />
        ))}
      </Accordion>
    </Box>
  );
};

export default ProductDetails;
