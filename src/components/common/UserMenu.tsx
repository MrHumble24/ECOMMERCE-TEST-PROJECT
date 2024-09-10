import { Avatar, Flex, Group, Menu, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import useAuthStore from "../../stores/useAuthStore";

const UserMenu = () => {
  const user = useAuthStore((s) => s.user);
  const rmAuthData = useAuthStore((s) => s.removeAuthData);
  if (!user) return null;
  return (
    <Group style={{ cursor: "pointer" }} mr={"lg"}>
      <Menu width={200} shadow="md">
        <Menu.Target>
          <Flex align={"center"} gap={"md"}>
            <Avatar name={user.username} src={user.image} />{" "}
            <Flex direction={"column"}>
              <Text fw={900} c="dimmed" size={"sm"}>
                {user.username.length > 15
                  ? user.username.slice(0, 15)
                  : user.username}
              </Text>
            </Flex>
          </Flex>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconLogout size={14} />}
            onClick={() => rmAuthData()}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default UserMenu;
