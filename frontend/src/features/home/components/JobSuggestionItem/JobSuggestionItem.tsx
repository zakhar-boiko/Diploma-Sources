import { FunctionComponent } from "react";
import { GigSuggestionType } from "../../api/types";
import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { formatDate } from "../../../../utils";
import { Link } from "../../../../components/Link/Link";
import { HiOutlineArrowRight } from "react-icons/hi";

interface JobSuggestionItemProps extends GigSuggestionType {}

const JobSuggestionItem: FunctionComponent<JobSuggestionItemProps> = ({
  id,
  publishingDate,
  suitabilityPercentage,
  title,
}) => {
  return (
    <Stack
      flexBasis={0}
      flexGrow={1}
      maxWidth={{ base: "fit-content", xl: "29rem" }}
      minWidth={{ base: "30rem", lg: "22rem" }}
      bg="ui_secondary"
      padding="1.25rem"
      borderRadius="0.25rem"
      borderWidth="0.065rem"
      borderColor="ui_elements_outlines_separators"
    >
      <Flex
        flexWrap="wrap"
        width="100%"
        margin="0 !important"
        alignItems="center"
        justifyContent="space-between"
        gap="0.25rem"
      >
        <Text
          opacity="50%"
          fontSize="sm"
          letterSpacing="-0.7px"
          fontWeight="500"
          whiteSpace="nowrap"
        >
          Published: {formatDate(publishingDate)}
        </Text>
        <Box
          cursor="default"
          py="0.5rem"
          px="0.75rem"
          maxW={120}
          overflowX="hidden"
          borderRadius="0.25rem"
          backgroundColor="ui_accents_main"
          whiteSpace="nowrap"
        >
          {Math.round(suitabilityPercentage)}% match
        </Box>
      </Flex>
      <Text
        margin="0 !important"
        whiteSpace="normal"
        fontFamily="heading"
        fontSize="1.5rem"
        fontWeight="500"
        noOfLines={2}
      >
        {title}
      </Text>
      <Link margin="0 !important" href={`gigs/${id}`}>
        <Flex mt="1rem" gap="0.75rem" alignItems="center">
          <Text whiteSpace="nowrap" fontWeight="500" textTransform="uppercase">
            Discover more
          </Text>
          <HiOutlineArrowRight width="1rem" />
        </Flex>
      </Link>
    </Stack>
  );
};

export default JobSuggestionItem;
