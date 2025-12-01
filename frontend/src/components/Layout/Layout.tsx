import { Stack } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <Stack
      justifyContent="stretch"
      minHeight="100vh"
      maxWidth={1920}
      mx="auto"
      bg='ui_main'
      gap={{ base:"2rem", sm:'2.5rem', "2xl": "3.75rem"}}
    >
      <Header />
      <Stack px={{ base: "1rem", sm: "2rem" }} as="main" flexGrow={1} gap="0">
        {children}
      </Stack>
      <Footer />
    </Stack>
  );
};

export default Layout;
