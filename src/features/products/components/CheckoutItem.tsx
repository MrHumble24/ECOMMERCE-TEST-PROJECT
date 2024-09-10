/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Flex, Group, Text, Image, Divider } from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import useCartStore from "../../../stores/useCartStore";

interface CheckoutItemProps {
  item: any;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ item }) => {
  const { incrementItemQuantity, decrementItemQuantity } = useCartStore();

  return (
    <>
      <Group justify="space-between" p="apart" mb="sm">
        <Flex align="center">
          <Image
            src={item.image}
            width={80}
            height={80}
            fit="cover"
            radius="md"
          />
          <Flex ml="md" direction="column">
            <Text fw={500}>{item.title}</Text>
            <Text size="sm" color="dimmed">
              ${item.price.toFixed(2)} each
            </Text>
          </Flex>
        </Flex>

        <Flex align="center" gap="xs">
          <Button
            size="xs"
            variant="filled"
            bg="blue"
            color="gray"
            radius="md"
            onClick={() => decrementItemQuantity(item.id)}
          >
            <IconMinus size={14} />
          </Button>
          <Text>{item.quantity}</Text>
          <Button
            size="xs"
            variant="filled"
            bg="blue"
            color="gray"
            radius="md"
            onClick={() => incrementItemQuantity(item.id)}
          >
            <IconPlus size={14} />
          </Button>
        </Flex>
      </Group>
      <Divider my="sm" />
    </>
  );
};

export default CheckoutItem;
