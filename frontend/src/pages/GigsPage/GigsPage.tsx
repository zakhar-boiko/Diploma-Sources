import { Stack, StackDivider, Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { useFetchGigs } from "../../features/gigs/api/client";
import GigItem from "../../features/gigs/components/GigItem/GigItem";
import ShowMoreButton from "../../components/ShowMoreButton/ShowMoreButton";
import ContentLoader from "../../components/ContentLoader/ContentLoader";

interface GigsPageProps {}

const GigsPage: FunctionComponent<GigsPageProps> = () => {
  const [page, setPage] = useState<number>(0);

  const { data: gigsData, isLoading, isFetching } = useFetchGigs(page);

  const gigs = gigsData?.gigs;

  return (
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
      <Stack gap="0.5rem">
        <Text
          fontFamily="heading"
          fontSize={{ base: "1.5rem", sm: "2.25rem" }}
          fontWeight="500"
          lineHeight="normal"
        >
          Gigs
        </Text>
        <Text
          lineHeight="1.25rem"
          opacity="0.5"
          fontSize={{ base: "sm", sm: "md" }}
          letterSpacing="-0.8px"
        >
          Find the gigs that suit your passion and skills
        </Text>
      </Stack>
      <Stack gap="3rem">
        {isLoading ? (
          <ContentLoader />
        ) : gigs?.length ? (
          <Stack gap="3rem">
            <Stack gap="1.25rem" alignItems="center">
              {gigs?.map((gig) => {
                return <GigItem key={gig.id} {...gig} />;
              })}
            </Stack>
            {gigsData?.hasMore && (
              <ShowMoreButton
                onClick={() => setPage((prevPage) => prevPage + 1)}
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
  );
};

export default GigsPage;
