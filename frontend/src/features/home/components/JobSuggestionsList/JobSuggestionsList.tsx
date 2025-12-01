import { Box, Button, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useCandidateJobsSuggestions } from "../../api/client";
import { useNavigate } from "react-router-dom";
import JobSuggestionItem from "../JobSuggestionItem/JobSuggestionItem";
import ContentLoader from "../../../../components/ContentLoader/ContentLoader";

const JobsSuggestionsList: FunctionComponent = () => {
  const { data: jobOffers, isLoading } = useCandidateJobsSuggestions();

  const navigate = useNavigate();

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <>
      {(jobOffers?.suitableJobs?.length ?? 0) > 0 ? (
        <Box flexGrow={1} flexBasis="0">
          <Flex
            gap="1rem"
            flexDirection={{ base: "column", md: "row" }}
            mb="2rem"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              fontFamily="heading"
              fontWeight="500"
              fontSize={{ base: "xl", sm: "2rem", "2xl": "2xl" }}
            >
              Jobs matching your profile:
            </Text>
            <Button
              variant="black"
              bg="black"
              py="0.75rem"
              px="3rem"
              fontSize="sm"
              onClick={() => navigate("/gigs")}
            >
              Go to jobs
            </Button>
          </Flex>

          <Flex
            flexWrap={{ base: "initial", lg: "wrap" }}
            pr={{ base: "1.5rem", lg: "0" }}
            mr={{ base: "-1.5rem", lg: "0" }}
            overflowX={{ base: "scroll", lg: "clip" }}
            css="::-webkit-scrollbar {
        display: none;
      }"
            gap="2rem"
            justifyContent={{ base: "space-between", lg: "center" }}
          >
            {jobOffers?.suitableJobs?.map((offer) => {
              return <JobSuggestionItem {...offer} />;
            })}
          </Flex>
        </Box>
      ) : (
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          opacity="0.5"
          textAlign="center"
        >
          Your profile does not contain enough information for us to generate
          jobs suggestions tailored to you specifically. Please complete your
          profile to unlock personal job suggestions.
        </Text>
      )}
    </>
  );
};

export default JobsSuggestionsList;
