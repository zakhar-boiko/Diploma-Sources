import { FunctionComponent, ReactNode } from "react";

import { ResponsiveValue, Stack, StyleProps, Text } from "@chakra-ui/react";

interface GigParameterSectionProps {
  title: string;
  description: string;
  gap?: ResponsiveValue<string | number>;
  style?: StyleProps;
  children: ReactNode;
}

const GigParameterSection: FunctionComponent<GigParameterSectionProps> = ({
  description,
  title,
  children,
  gap = "1.5rem",
  style,
}) => {
  return (
    <Stack
      mt="0 !Important"
      padding="2.5rem"
      borderRadius="0.75rem"
      gap={gap}
      bg="#FFF"
      {...style}
    >
      <Stack gap="0.25rem">
        <Text
          fontWeight="500"
          fontFamily="heading"
          fontSize={{ base: "md", sm: "lg" }}
          lineHeight="normal"
        >
          {title}
        </Text>
        <Text
          letterSpacing="-0.8px"
          mt="0 !important"
          opacity="0.5"
          lineHeight="1.25rem"
        >
          {description}
        </Text>
      </Stack>
      {children}
    </Stack>
  );
};

export default GigParameterSection;
