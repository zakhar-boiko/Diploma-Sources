import { FunctionComponent, ReactNode } from "react";

import { Flex, Stack, StyleProps, Text } from "@chakra-ui/react";

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
  hasBorder?: boolean;
  style?: StyleProps;
  rightElement?: ReactNode;
}

const ProfileSection: FunctionComponent<ProfileSectionProps> = ({
  title,
  children,
  hasBorder = true,
  rightElement,
  style,
}) => {
  return (
    <Stack
      borderBottomWidth={hasBorder ? "0.065rem" : "none"}
      borderColor="ui_elements_outlines_separators"
      borderStyle="solid"
      paddingBottom={hasBorder ? "1.5rem" : "0"}
      gap="1.5rem"
      mt="0 !important"
      {...style}
    >
      <Flex justifyContent="space-between" alignItems="center" gap="3rem">
        <Text
          fontWeight="500"
          fontFamily="heading"
          fontSize={{ base: "1.125rem", sm: "xl" }}
          lineHeight="normal"
        >
          {title}
        </Text>

        {rightElement && rightElement}
      </Flex>

      <Stack maxWidth={835} gap="0">
        {children}
      </Stack>
    </Stack>
  );
};

export default ProfileSection;
