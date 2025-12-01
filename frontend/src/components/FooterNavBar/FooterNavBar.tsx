import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useFetchProfile } from "../../features/profile/api/client";
import { navItemsCandidate, navItemsRecruiter } from "../NavBar/NavBar";
import { Link } from "../Link/Link";

interface FooterNavbarProps {}

const FooterNavbar: FunctionComponent<FooterNavbarProps> = () => {
  const { data: profile } = useFetchProfile();

  let navItems =
    profile?.accountType == "CONSULTANT"
      ? navItemsCandidate
      : navItemsRecruiter;

  return (
    <Flex
      alignSelf="flex-end"
      gap={{ base: "1rem", sm: "2rem", "2xl": "3rem" }}
    >
      {navItems.map((item) => {
        return (
          <Link href={item.href} color="white">
            {item.name}
          </Link>
        );
      })}
    </Flex>
  );
};

export default FooterNavbar;
