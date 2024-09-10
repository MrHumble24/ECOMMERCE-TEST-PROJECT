import { Center, Image, useMantineColorScheme } from "@mantine/core";
import light from "../../assets/logo-dark.png";
import dark from "../../assets/logo-light.png";

const Logo = () => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Center my={"lg"}>
      <Image w={150} src={colorScheme === "dark" ? light : dark} />
    </Center>
  );
};

export default Logo;
