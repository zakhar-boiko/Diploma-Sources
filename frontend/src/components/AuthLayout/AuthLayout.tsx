import { Center, Image, Stack, background } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
interface AuthLayoutProps {}

const AuthLayout: FunctionComponent<AuthLayoutProps> = () => {
  return (
    <Stack
      justifyContent="stretch"
      minHeight="100vh"
      bg='ui_main'
      maxWidth={1920}
      mx="auto"
      gap="0"
    >
      <Center px={{ base:'1rem', sm:'2rem'}} py="1.5rem" borderBottom="0.065rem solid black">
        <Image width={200} src={process.env.PUBLIC_URL + "/LogoDark.png"} />
      </Center>
      <Stack px={{ base:'1rem', sm:'2rem'}} style={{ flexGrow: 1 }}>
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default AuthLayout;
