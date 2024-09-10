import {
  ActionIcon,
  Group,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./styles/DarkModeToggle.module.css";

export function DarkModeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Group justify="center">
      <ActionIcon
        radius={"xl"}
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="default"
        size="md"
        aria-label="Toggle color scheme"
      >
        <IconSun
          className={cx(classes.icon, classes.light)}
          size={25}
          stroke={1.5}
          color="orange"
        />
        <IconMoon
          className={cx(classes.icon, classes.dark)}
          size={25}
          stroke={1.5}
        />
      </ActionIcon>
    </Group>
  );
}
