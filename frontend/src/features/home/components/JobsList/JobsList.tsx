import { FunctionComponent } from "react";
import { useFetchUsersGigs } from "../../api/client";
import { useNavigate, useNavigation } from "react-router-dom";
import ContentLoader from "../../../../components/ContentLoader/ContentLoader";
import { Accordion, Box, Button, Stack, Text } from "@chakra-ui/react";
import PostedJobItem from "../PostedJobItem/PostedJobItem";

const JobsList: FunctionComponent = () => {
  const { data: postedJobs, isLoading } = useFetchUsersGigs();

  const navigate = useNavigate();

  if (isLoading) {
    return <ContentLoader />;
  }

  return (
    <Stack gap={{ base: "1.25rem", sm: "2rem" }}>
      {(postedJobs?.length ?? 0) > 0 ? (
        <Accordion
          allowMultiple
          display="flex"
          gap={{ base: "1.5rem", sm: "2.5rem" }}
          flexDir="column"
        >
          {postedJobs?.map((job) => (
            <PostedJobItem key={job.id} {...job} />
          ))}
        </Accordion>
      ) : (
        <Stack alignItems="center" gap="1.25rem">
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            opacity="0.5"
            textAlign="center"
          >
            You currently do not have any jobs posted
          </Text>
          <Button
            as="a"
            href={"/gigs/add"}
            width={{ base: "100%", sm: "16.25rem" }}
            py="0.875rem"
            variant="regular"
          >
            Post a job
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default JobsList;
