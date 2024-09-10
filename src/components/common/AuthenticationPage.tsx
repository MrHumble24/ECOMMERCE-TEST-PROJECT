import {
  Anchor,
  Box,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useLogin } from "../../features/users/hooks/useLogin";
import classes from "././styles/AuthenticationImage.module.css";

export function AuthenticationImage() {
  const { isLoading, login, error } = useLogin();

  if (error) {
    console.log(error);
  }

  const form = useForm({
    initialValues: {
      username: "emilys",
      password: "emilyspass",
    },
    validate: {
      username: (value) =>
        value.length <= 0 ? "Please enter your email address" : null,
      password: (value) =>
        value.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    login(values.username, values.password);
  };
  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title
            order={2}
            className={classes.title}
            ta="center"
            mt="md"
            mb={50}
          >
            Welcome back to EShop!
          </Title>

          <TextInput
            label="Username"
            placeholder="username"
            size="md"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("password")}
            size="md"
          />

          <Button loading={isLoading} fullWidth mt="xl" type="submit" size="md">
            Login
          </Button>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor<"a">
              href="#"
              fw={700}
              onClick={(event) => event.preventDefault()}
            >
              Register
            </Anchor>
          </Text>
        </form>
      </Paper>
    </Box>
  );
}
