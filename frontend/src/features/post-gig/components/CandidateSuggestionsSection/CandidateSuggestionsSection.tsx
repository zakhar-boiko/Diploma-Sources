import { FunctionComponent } from "react";

import { Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { useFetchGigSuggestions } from "../../../home/api/client";
import CandidateItem from "../CandidateItem/CandidateItem";

interface CandidateSuggestionsProps {
  gigId?: string;
}

const CandidateSuggestions: FunctionComponent<CandidateSuggestionsProps> = ({
  gigId,
}) => {
  const { data: candidatesSuggestions } = useFetchGigSuggestions(gigId ?? "");

  return (
    <>
      {(candidatesSuggestions?.suitableUsers?.length ?? 0) > 0 && (
        <Stack
          maxWidth="100%"
          mt={{ base: "1.5rem !important", md: "0 !important" }}
          flexGrow={1}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text
              fontSize={{ base: "md", sm: "lg" }}
              lineHeight="normal"
              fontWeight="500"
            >
              Best matching candidates
            </Text>
          </Flex>
          <Stack
            pt={{ base: "1rem", sm: "2rem" }}
            mt="0 !important"
            gap="1.5rem"
          >
            {candidatesSuggestions?.suitableUsers?.map((consultant) => {
              return (
                <>
                  <CandidateItem {...consultant} />
                  <Divider margin="0 !important" borderColor="black" />
                </>
              );
            })}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default CandidateSuggestions;
