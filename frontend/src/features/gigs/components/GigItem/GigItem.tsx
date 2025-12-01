import { FunctionComponent } from "react";

import { HStack, Stack, StackDivider, Text } from "@chakra-ui/react";
import { GigType } from "../../api/types";
import SeeMoreButton from "../../../../components/SeeMoreButton/SeeMoreButton";
import { formatDate } from "../../../../utils";
import { PROFILE_LEVEL_VALUES_MAP } from "../../../../constants";

const GigItem: FunctionComponent<GigType> = ({
  profileLevel,
  title,
  description,
  publicationDate,
  id,
}) => {
  return (
    <HStack
      mt="0 !important"
      w="100%"
      height="264"
      borderRadius="0.5rem"
      background="white"
    >
      <Stack
        borderRight="0.065rem solid #DFE3EE"
        maxWidth={1018}
        height="100%"
        flexBasis="68.5%"
        padding="2rem"
        gap="2.5rem"
        paddingRight={{ base: "2rem", "2xl": "3.75rem" }}
        justifyContent="space-between"
      >
        <Stack gap="0.5rem">
          <Text
            fontWeight="500"
            fontFamily="heading"
            fontSize={{ base: "1.125rem", sm: "xl" }}
            lineHeight="normal"
          >
            {title}
          </Text>
          <Text
            noOfLines={4}
            mt="0 !important"
            lineHeight="1.5rem"
            letterSpacing="-0.8px"
          >
            {description}
          </Text>
        </Stack>
        <SeeMoreButton linkTitle="Details" href={`/gigs/${id}`} />
      </Stack>
      <Stack
        flexGrow={1}
        flexBasis={0}
        margin="0 !important"
        lineHeight="normal"
        padding="2rem"
        paddingLeft={{ base: "2rem", "2xl": "3.75rem" }}
        gap="2rem"
      >
        <Stack gap="0.5rem">
          <Text
            fontWeight="500"
            fontSize="sm"
            letterSpacing="-0.7px"
            textTransform="uppercase"
            opacity="0.5"
          >
            Profile level
          </Text>

          <Text
            mt="0 !important"
            whiteSpace={{ base: "pre-wrap", "2xl": "nowrap" }}
            letterSpacing="-0.8px"
          >
            {PROFILE_LEVEL_VALUES_MAP[profileLevel]}
          </Text>
        </Stack>
        <Stack mt="0 !important" gap="0.5rem">
          <Text
            fontWeight="500"
            fontSize="sm"
            letterSpacing="-0.7px"
            textTransform="uppercase"
            opacity="0.5"
          >
            Published
          </Text>
          <Text
            mt="0 !important"
            as="span"
            whiteSpace={{ base: "pre-wrap", "2xl": "nowrap" }}
          >
            <Text as="span">{formatDate(publicationDate, "DD.MM.YYYY")} </Text>
          </Text>
        </Stack>
      </Stack>
    </HStack>
  );
};

export default GigItem;
