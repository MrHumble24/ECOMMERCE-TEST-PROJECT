import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Button,
  Flex,
  Group,
  Indicator,
  ScrollArea,
} from "@mantine/core";
import { IconLogin, IconShoppingCart } from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";
import CartComponent from "../../features/products/components/CartComponent";
import ProductCategories from "../../features/products/components/ProductCategories";
import useAuthStore from "../../stores/useAuthStore";
import useCartStore from "../../stores/useCartStore";
import useSettingsStore from "../../stores/useSettingsStore";
import { DarkModeToggle } from "../common/DarkModeToggle";
import Logo from "../common/Logo";
import UserMenu from "../common/UserMenu";

export function ECommerceLayout() {
  const user = useAuthStore((state) => state.user);
  const menuOpen = useSettingsStore((s) => s.menuOpen);
  const toggleMenu = useSettingsStore((s) => s.toggleMenu);
  const carts = useCartStore((s) => s.cartItems);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: menuOpen } }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="md">
          <Flex gap={10}>
            <Burger
              opened={!menuOpen}
              onClick={() => toggleMenu()}
              hiddenFrom="sm"
              size="sm"
            />
            <DarkModeToggle />
          </Flex>
          <Group>
            <Link to="/checkout">
              {carts.length > 0 ? (
                <Indicator
                  size={"lg"}
                  position="top-start"
                  processing
                  label={carts.length}
                >
                  <ActionIcon
                    radius={"xl"}
                    variant="default"
                    size="lg"
                    aria-label="Toggle color scheme"
                  >
                    <IconShoppingCart size={25} stroke={1.5} color="skyblue" />
                  </ActionIcon>
                </Indicator>
              ) : (
                <ActionIcon
                  radius={"xl"}
                  variant="default"
                  size="lg"
                  aria-label="Toggle color scheme"
                >
                  <IconShoppingCart size={25} stroke={1.5} color="skyblue" />
                </ActionIcon>
              )}
            </Link>
            {user ? (
              <UserMenu />
            ) : (
              <Link to="/login">
                <Button radius={"md"} leftSection={<IconLogin size={17} />}>
                  Login
                </Button>
              </Link>
            )}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" component={ScrollArea}>
        <Logo />
        <ProductCategories />
      </AppShell.Navbar>
      <AppShell.Main>
        <Box mah={"calc(100vh - 50em )"}>
          <Outlet />
        </Box>
      </AppShell.Main>
      {carts.length > 0 && (
        <AppShell.Aside p="md">
          <CartComponent />
        </AppShell.Aside>
      )}
    </AppShell>
  );
}
