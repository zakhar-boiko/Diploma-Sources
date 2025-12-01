import { FC } from "react";

import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  LinkProps,
} from "@chakra-ui/react";

export const Link: FC<Omit<ChakraLinkProps, "href"> & LinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <ChakraLink href={href as string} {...props}>
      {children}
    </ChakraLink>
  );
};
