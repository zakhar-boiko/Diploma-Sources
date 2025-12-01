import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent, useMemo } from "react";
import { useFetchGigDetails } from "../../features/gigs/api/client";
import { useParams } from "react-router-dom";
import { useFetchProfile } from "../../features/profile/api/client";
import { formatDate } from "../../utils";
import { PROFILE_LEVEL_VALUES_MAP } from "../../constants";
import { Link } from "../../components/Link/Link";
import CandidateSuggestions from "../../features/post-gig/components/CandidateSuggestionsSection/CandidateSuggestionsSection";

interface GigPageProps {}

const GigPage: FunctionComponent<GigPageProps> = () => {
  const { id } = useParams();

  const { data: gigDetails, isLoading } = useFetchGigDetails(id ?? "");
  const { data: profile } = useFetchProfile();

  const isGigCreator = profile?.id == gigDetails?.creatorId;

  const requirements = useMemo(() => {
    return gigDetails? [...gigDetails?.skills, ...gigDetails.languages]: []
  }, [gigDetails])

  return (
    <Flex mx="auto" width="100%" maxWidth={1520}>
      <Flex
        justifyContent="space-between"
        gap={{ base: "2rem", sm: "3rem" }}
        maxWidth={1272}
        width="100%"
        flexDirection={{ base: "column", lg: "row" }}
        px={{ base: "1rem", sm: "2rem" }}
        py={{ base: "2rem", sm: "3.75rem" }}
        pb={{
          base: isGigCreator ? "2rem" : "0rem !important",
          md: "3.75rem !important",
        }}
      >
        <Stack
          flexDirection={{ base: "column", md: "row", lg: "column" }}
          flexWrap="wrap"
          justifyContent={{
            base: "flex-start",
            md: "space-between",
            lg: "flex-start",
          }}
          order={{ base: 2, lg: 1 }}
          gap={{ base: "0rem", md: "1.5rem" }}
          maxWidth={{ base: "100%", lg: 372 }}
          width="100%"
        >
          <Stack
            gap={{ base: "1rem", sm: "2rem" }}
            borderRadius={{ base: "0", md: "0.25rem" }}
            py={{ base: "2rem", sm: "3rem" }}
            px={{ base: "1rem", sm: "3rem" }}
            bg="black"
            color="white"
            flexShrink={1}
            ml={{
              base: "-1rem !important",
              sm: "-2rem !important",
              md: "0 !important",
            }}
            w={{ base: "100vw", md: "100%" }}
            maxWidth={{ base: "100vw", md: 372 }}
          >
            <Box mt="0 !important">
              <Text
                fontSize="sm"
                opacity="0.5"
                mb="0.5rem"
                letterSpacing="-0.8px"
                lineHeight="1.25rem"
              >
                Published
              </Text>
              <Text
                fontSize={{ base: "sm", sm: "md" }}
                letterSpacing="-1px"
                lineHeight="1.25rem"
              >
                {formatDate(gigDetails?.publicationDate ?? "")}
              </Text>
            </Box>

            <Box mt="0 !important">
              <Text
                fontSize="sm"
                opacity="0.5"
                mb="0.5rem"
                letterSpacing="-0.8px"
                lineHeight="1.25rem"
              >
                Profile level
              </Text>
              <Text
                fontSize={{ base: "sm", sm: "md" }}
                letterSpacing="-1px"
                lineHeight="1.25rem"
                whiteSpace="pre-wrap"
              >
                {PROFILE_LEVEL_VALUES_MAP[gigDetails?.profileLevel ?? ""]}
              </Text>
            </Box>

            {/* <Link
              href={`mailto:zaharbojko@gmail.com?subject=I am interested in applying for ${gigDetails?.title}`}
              // target="_blank"
              mt="0 !important"
              alignSelf="center"
              width="100%"
              textDecor="none !important"
            >
              <Button
                variant="secondary"
                border="0.065rem solid white"
                _hover={{
                  borderColor: "ui_accents_main",
                  backgroundColor: "ui_accents_main",
                  color: "black",
                }}
                mt="0 !important"
                width="100%"
                alignSelf="center"
              >
                I’m interested
              </Button>
            </Link> */}
          </Stack>

          {isGigCreator && <CandidateSuggestions gigId={id} />}
        </Stack>

        <Stack
          order={{ base: 1, lg: 2 }}
          flexGrow={1}
          flexShrink={1}
          letterSpacing="-0.8px"
          fontSize={{ base: "sm", sm: "md" }}
          maxWidth={{ base: "100%", xl: 744 }}
          gap={{ base: "1.25rem", sm: "2rem" }}
        >
          <Text
            mt={{ base: "0.75rem", sm: "1.25rem" }}
            fontFamily="heading"
            fontSize={{ base: "xl", sm: "2xl" }}
            fontWeight="500"
            lineHeight={{ base: "2rem", sm: "3.25rem" }}
          >
            {gigDetails?.title}
          </Text>

          {gigDetails?.description && (
            <Box
              width="100%"
              lineHeight={{ base: "1.5rem", sm: "2rem" }}
              fontSize={{ base: "md", sm: "lg" }}
              maxWidth={{ base: "100%", xl: 744 }}
            >
              <Text
                fontSize={{ base: "1rem", sm: "lg" }}
                lineHeight={{ base: "1.25rem", sm: "2rem" }}
                letterSpacing={{ base: "-0.8px", sm: "-1px" }}
                whiteSpace="pre-wrap"
              >
                {gigDetails.description}
              </Text>
            </Box>
          )}
          {requirements.length && (
            <Flex mt="0 !important" flexWrap="wrap" gap="0.5rem">
              {requirements.map((requirement) => {
                return (
                  <Box
                    cursor="default"
                    padding="0.5rem"
                    textTransform="uppercase"
                    letterSpacing="-0.7px"
                    fontSize="sm"
                    background="ui_main"
                    borderWidth="0.065rem"
                    borderStyle="solid"
                    borderColor="ui_elements_outlines_separators"
                    borderRadius="0.25rem"
                    transition="all 0.3s"
                    whiteSpace="nowrap"
                  >
                    {requirement.name}
                  </Box>
                );
              })}
            </Flex>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default GigPage;
