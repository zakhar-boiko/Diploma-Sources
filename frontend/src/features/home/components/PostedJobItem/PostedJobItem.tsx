import { FunctionComponent } from "react";

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { formatDate } from "../../../../utils";
import { HiOutlineArrowDown, HiOutlineArrowUp } from "react-icons/hi";
import { useFetchGigSuggestions } from "../../api/client";
import CandidateItem from "../../../../components/CandidateItem/CandidateItem";
import { Link } from "../../../../components/Link/Link";

interface PostedJobItemProps {
  id: string;
  title: string;
  publicationDate?: string;
}

const PostedJobItem: FunctionComponent<PostedJobItemProps> = ({
  id,
  publicationDate,
  title,
}) => {
  const { data: candidatesData } = useFetchGigSuggestions(id);

  const candidates = candidatesData?.suitableUsers;

  return (
    <AccordionItem fontSize={{ base: "sm", sm: "md" }} border="0" width="100%">
      {({ isExpanded }) => (
        <>
          <AccordionButton
            px="0"
            pt="0"
            pb={{ base: "1rem", sm: "1.5rem" }}
            borderBottom="0.065rem solid rgba(0,0,0,0.2)"
            _hover={{}}
            justifyContent="space-between"
          >
            <Stack gap="0.25rem" letterSpacing="-0.8px" width="100%">
              {publicationDate && (
                <Text
                  alignSelf="flex-start"
                  opacity="0.5"
                  mt="0 !important"
                  gap="1.25rem"
                  fontSize="sm"
                  letterSpacing="-0.7px"
                >
                  Published: {formatDate(publicationDate, "MMMM D, YYYY")}
                </Text>
              )}
              <Flex
                flexWrap="wrap"
                gap="1rem"
                mt="0.25rem !important"
                justifyContent="space-between"
              >
                <Link
                  href={`/gigs/${id}`}
                  mt="0 !important"
                  fontFamily="heading"
                  lineHeight={{ base: "1.5rem", sm: "2rem" }}
                  fontWeight="500"
                  fontSize={{ base: "1.125rem", sm: "xl" }}
                >
                  {title}
                </Link>

                <Flex gap="1rem" alignItems="center">
                  {candidates && (
                    <Text
                      fontWeight="500"
                      lineHeight="normal"
                      textTransform="uppercase"
                    >
                      Recommended candidates ({candidates.length})
                    </Text>
                  )}
                  <Box
                    transform={isExpanded ? "rotate(180deg)" : ""}
                    transition="all 0.3s"
                  >
                    <HiOutlineArrowDown size="1rem" fill="black" />
                  </Box>
                </Flex>
              </Flex>
            </Stack>
          </AccordionButton>
          <AccordionPanel
            mt="2rem"
            pl={{ base: "1rem", sm: "2rem", "2xl": "2.5rem" }}
            pr="0"
            py="0"
          >
            {(candidates?.length ?? 0) > 0 ? (
              <Stack
                divider={
                  <StackDivider
                    margin="0 !important"
                    borderColor="rgba(0,0,0,0.2)"
                  />
                }
                gap={{ base: "1rem", sm: "2rem" }}
              >
                {candidates?.map((candidate) => (
                  <CandidateItem key={candidate.id} {...candidate} />
                ))}
              </Stack>
            ) : (
              <Text
                fontSize={{ base: "sm", sm: "md" }}
                opacity="0.5"
                textAlign="center"
              >
                This job has no recommended candidates yet
              </Text>
            )}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default PostedJobItem;
