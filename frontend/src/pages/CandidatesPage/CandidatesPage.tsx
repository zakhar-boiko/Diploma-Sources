import { Box, Button, Flex, Stack, StackDivider, Text } from "@chakra-ui/react";
import { FunctionComponent, useMemo, useState } from "react";
import { useFetchFilteredCandidates } from "../../features/candidates/api/client";
import { FilterOptions } from "../../features/candidates/api/types";
import { DEFAULT_FILTER_OPTIONS } from "../../features/candidates/constants";
import { useParsedFilterOptions } from "../../features/candidates/hooks";
import ContentLoader from "../../components/ContentLoader/ContentLoader";
import ShowMoreButton from "../../components/ShowMoreButton/ShowMoreButton";
import CandidateItem from "../../components/CandidateItem/CandidateItem";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { candidatesFiltersSlice } from "../../state/CandidatesFiltersDrawerState";
import FiltersDrawer from "../../features/candidates/components/FiltersDrawer/FiltersDrawer";
import { useAppSelector } from "../../store/hooks";

interface CandidatesPageProps {}

const CandidatesPage: FunctionComponent<CandidatesPageProps> = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(
    DEFAULT_FILTER_OPTIONS
  );

  const parsedFilterOptions = useParsedFilterOptions(filterOptions);

  console.log(parsedFilterOptions)
  const {
    data: candidatesData,
    isLoading,
    isFetching,
  } = useFetchFilteredCandidates(parsedFilterOptions);

  const candidates = candidatesData?.candidates;

  const isFilterApplied = useMemo(() => {
    return Object.values(filterOptions).some(
      (filter) => typeof filter == "object" && filter.length > 0
    );
  }, [filterOptions]);

  const dispatch = useDispatch();

  const { filterCandidates } = useAppSelector((state) => state.main);

  return (
    <>
      <Stack
        divider={
          <StackDivider
            margin="0 !important"
            borderColor="ui_elements_outlines_separators"
          />
        }
        gap="2rem"
        maxW={1492}
        width="100%"
        alignSelf="center"
        flexGrow={1}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Stack gap="0.5rem">
            <Text
              fontFamily="heading"
              fontSize={{ base: "1.5rem", sm: "2.25rem" }}
              fontWeight="500"
              lineHeight="normal"
            >
              Candidates
            </Text>
            <Text
              lineHeight="1.25rem"
              opacity="0.5"
              fontSize={{ base: "sm", sm: "md" }}
              letterSpacing="-0.8px"
            >
              Search for candidates seeking for job opportunities
            </Text>
          </Stack>
          <Button
            flexShrink={0}
            position="relative"
            variant="secondary"
            letterSpacing="-0.8px"
            px="1.5rem"
            py="0.75rem"
            _hover={{
              color: "white",
              bg: "black",
              stroke: "white",
            }}
            onClick={() =>
              dispatch(
                candidatesFiltersSlice.actions.toggleDrawer({
                  isOpen: true,
                })
              )
            }
            leftIcon={<HiOutlineAdjustmentsVertical size="1.5rem" />}
          >
            Filter candidates
            {isFilterApplied && (
              <Box
                width="0.5rem"
                height="0.5rem"
                position="absolute"
                bg="#F20000"
                borderRadius="50%"
                top="0.5rem"
                left="1rem"
              ></Box>
            )}
          </Button>
        </Flex>

        <Stack width="100%">
          {isLoading ? (
            <ContentLoader />
          ) : candidates?.length ? (
            <Stack gap="3rem">
              <Stack
                divider={
                  <StackDivider
                    margin="0 !important"
                    borderColor="ui_elements_outlines_separators"
                  />
                }
                gap="1.5rem"
                alignItems="center"
              >
                {candidates?.map((candidate) => {
                  return <CandidateItem key={candidate.id} {...candidate} />;
                })}
              </Stack>
              {candidatesData?.hasMore && (
                <ShowMoreButton
                  onClick={() =>
                    setFilterOptions((prevFilterOptions) => ({
                      ...prevFilterOptions,
                      page: prevFilterOptions.page + 1,
                    }))
                  }
                  isLoading={isFetching}
                />
              )}
            </Stack>
          ) : (
            <Text
              py="3rem"
              opacity="0.5"
              letterSpacing="-0.8px"
              textAlign="center"
            >
              No gigs posted yet
            </Text>
          )}
        </Stack>
      </Stack>
      <FiltersDrawer
        isOpen={filterCandidates.isOpen || false}
        onClose={() =>
          dispatch(
            candidatesFiltersSlice.actions.toggleDrawer({
              isOpen: false,
            })
          )
        }
        setFilterOptions={setFilterOptions}
        isFilterApplied={isFilterApplied}
      />
    </>
  );
};

export default CandidatesPage;
