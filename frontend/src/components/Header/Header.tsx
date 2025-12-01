import { Flex, Image, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import ProfilePopover from "../ProfilePopover/ProfilePopover";
import Navbar from "../NavBar/NavBar";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <Flex borderBottom="0.065rem solid black" justify="center">
      {" "}
      <Flex
        maxWidth={1520}
        px={{ base: "1rem", sm: "2rem" }}
        py="1.25rem"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image width={200} src={process.env.PUBLIC_URL + "/LogoDark.png"} />
        <Flex alignItems='center' gap='3rem'>
       
          <Navbar />
          <ProfilePopover />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
