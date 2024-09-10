import {
  Box,
  Button,
  Card,
  Image,
  NumberFormatter,
  ScrollArea,
  Text,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import useCartStore from "../../../stores/useCartStore";

const CartComponent = () => {
  const {
    cartItems,
    incrementItemQuantity,
    decrementItemQuantity,
    removeItem,
    totalPrice,
  } = useCartStore();

  return (
    <Box>
      <Text ta={"center"} fw={900}>
        Total:{" "}
        <NumberFormatter
          value={totalPrice.toFixed(2)}
          thousandSeparator
          prefix="$ "
        />
      </Text>
      <Link to="/checkout">
        <Button leftSection={<IconShoppingCart />} fullWidth my={12}>
          Checkout
        </Button>
      </Link>
      <ScrollArea h={"calc(100vh - 10em)"}>
        {cartItems.map((item) => (
          <Card withBorder my={12} key={item.id}>
            <Image radius="md" maw={"50%"} src={item.image} alt={item.title} />

            <Box>
              <Text fw={900}>{item.title}</Text>
              <Text c="dimmed">
                Price:{" "}
                <NumberFormatter
                  value={(
                    item.price *
                    item.quantity *
                    (1 - item.discountPercentage / 100)
                  ).toFixed(2)}
                  thousandSeparator
                  prefix="$ "
                  fixedDecimalScale
                />
              </Text>
              <Text c={"dimmed"}>Quantity: {item.quantity}</Text>
            </Box>

            <Button.Group>
              <Button
                variant="default"
                onClick={() => incrementItemQuantity(item.id)}
              >
                +
              </Button>
              <Button variant="default" onClick={() => removeItem(item.id)}>
                Remove
              </Button>
              <Button
                variant="default"
                onClick={() => decrementItemQuantity(item.id)}
              >
                -
              </Button>
            </Button.Group>
          </Card>
        ))}
      </ScrollArea>
    </Box>
  );
};

export default CartComponent;
