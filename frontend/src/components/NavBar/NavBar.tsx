import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useFetchProfile } from "../../features/profile/api/client";
import { Link } from "../Link/Link";
import { useLocation } from "react-router-dom";

export const navItemsCandidate = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Gigs",
    href: "/gigs",
  },
];

export const navItemsRecruiter = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Post gig",
    href: "/gigs/add",
  },
  {
    name: "Candidates",
    href: "/users/candidates",
  },
];

const Navbar: FunctionComponent = () => {
  const { data: profile } = useFetchProfile();

  const location = useLocation();

  const navItems =
    profile?.accountType == "CONSULTANT"
      ? navItemsCandidate
      : navItemsRecruiter;

  const activeLinkBorderOffset = useBreakpointValue({
    base: "-30px",
    xl: "-28px",
  });

  return (
    <Flex
      display={{ base: "none", md: "flex" }}
      as="nav"
      alignItems="center"
      flex={1}
    >
      <Flex gap={{ md: "1rem", xl: "2.5rem" }}>
        {navItems?.map(({ name, href }) => {
          return (
            <Link
              key={name}
              href={href}
              fontSize={{ md: "0.875rem", xl: "1rem" }}
              position="relative"
              _after={{
                display: location.pathname == href ? "block" : "none",
                position: "absolute",
                content: '""',
                bottom: activeLinkBorderOffset,
                left: 0,
                width: "100%",
                height: "4px",
                background: "black",
              }}
              _hover={{
                textDecoration: "none",
              }}
            >
              {name}
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Navbar;
