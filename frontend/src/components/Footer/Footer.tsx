import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import FooterNavbar from "../FooterNavBar/FooterNavBar";
import { HiArrowUp } from "react-icons/hi";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <Flex bg="black" justifyContent="center">
      <Flex
        maxWidth={1520}
        px={{ base: "1rem", sm: "2rem" }}
        width="100%"
        justifyContent="space-between"
        alignItems='center'
        py={{ base: "2.5rem", sm: "3.75rem", "2xl": "5rem" }}
      >
        <Stack>
          <Image width={120} src={process.env.PUBLIC_URL + "/LogoLight.svg"} />
          <Text mt="0.5rem" fontSize={{ base: "sm", sm: "md" }} color="grey">
            &copy; {new Date().getFullYear()} match-me | All rights reserved.
          </Text>
        </Stack>
        <FooterNavbar />
        <Button
          rounded="full"
          border="0.125rem solid white"
          variant="ghost"
          color="white"
          _hover={{
            bg: "white",
            color: "black",
          }}
          onClick={() =>
            window.scrollTo({ left: 0, top: 0, behavior: "smooth" })
          }
        >
          <HiArrowUp fontSize="1rem" color="inherit" />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Footer;
