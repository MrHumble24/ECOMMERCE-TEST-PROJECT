import {
  Blockquote,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import useCartStore from "../../../stores/useCartStore";

import useAuthStore from "../../../stores/useAuthStore";
import { IconInfoCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import CheckoutItem from "../components/CheckoutItem";

const CheckoutPage = () => {
  const { cartItems, totalItems, totalPrice, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);
  // Form for user details (shipping & payment)
  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      country: "",
      zip: "",
    },
  });

  const handlePlaceOrder = () => {
    console.log("Order placed", form.values);
    clearCart();
    form.reset();
  };

  return (
    <Container p={{ base: "md", md: "lg" }}>
      <Grid>
        <Grid.Col span={12}>
          <Paper shadow="sm" radius="md" p="lg">
            <Group p="apart" mb="md">
              <Title order={3}>Shopping Cart</Title>
              <Text c="dimmed" size="sm">
                {totalItems} items
              </Text>
            </Group>
            <Divider mb="md" />
            {cartItems.length > 0 ? (
              <Stack>
                {cartItems.map((item) => (
                  <CheckoutItem key={item.id} item={item} />
                ))}
                <Divider my="sm" />
                <Flex justify="space-between" align="center">
                  <Text>Total</Text>
                  <Text fw={700} size="lg">
                    ${totalPrice.toFixed(2)}
                  </Text>
                </Flex>
              </Stack>
            ) : (
              <Text>Your cart is empty.</Text>
            )}
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper shadow="sm" radius="md" p="lg">
            <Title order={4} mb="md">
              Shipping & Payment
            </Title>
            {user ? (
              <form onSubmit={form.onSubmit(handlePlaceOrder)}>
                <Stack gap="sm">
                  <TextInput
                    label="Full Name"
                    placeholder="John Doe"
                    required
                    {...form.getInputProps("fullName")}
                  />
                  <TextInput
                    label="Email"
                    placeholder="john.doe@example.com"
                    required
                    {...form.getInputProps("email")}
                  />
                  <TextInput
                    label="Address"
                    placeholder="1234 Main St"
                    required
                    {...form.getInputProps("address")}
                  />
                  <TextInput
                    label="City"
                    placeholder="New York"
                    required
                    {...form.getInputProps("city")}
                  />
                  <TextInput
                    label="Country"
                    placeholder="USA"
                    required
                    {...form.getInputProps("country")}
                  />
                  <TextInput
                    label="Zip / Postal Code"
                    placeholder="10001"
                    required
                    {...form.getInputProps("zip")}
                  />
                  <Divider my="md" />
                  <Button type="submit" fullWidth size="lg" radius="md">
                    Place Order
                  </Button>
                </Stack>
              </form>
            ) : (
              <Blockquote
                color="blue"
                cite="- EShop Administration Team ❤️"
                icon={<IconInfoCircle size={25} stroke={2} />}
                mt="xl"
              >
                Please{" "}
                <Link to="/login">
                  <Button variant="subtle" color="blue">
                    Login
                  </Button>
                </Link>{" "}
                to place an order.
              </Blockquote>
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
