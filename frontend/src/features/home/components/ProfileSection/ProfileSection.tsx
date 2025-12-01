import { FunctionComponent } from "react";

import {
  Avatar,
  Box,
  CircularProgress,
  Flex,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useFetchProfile } from "../../../profile/api/client";
import { Link } from "../../../../components/Link/Link";
import { HiOutlineArrowRight, HiOutlineUser } from "react-icons/hi";
import JobsSuggestionsList from "../JobSuggestionsList/JobSuggestionsList";
import JobsList from "../JobsList/JobsList";
import { AccountType } from "../../../profile/api/enums/enums";

interface ProfileSectionProps {}

const ProfileSection: FunctionComponent<ProfileSectionProps> = () => {
  const { data: profile } = useFetchProfile();
  const progressBarSize = useBreakpointValue({ base: "5.25rem", sm: "6rem" });

  return (
    <Stack maxWidth={1456} width="100%" gap="1.25rem">
      <Flex
        pb="1.5rem"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        borderBottomWidth="0.065rem "
        borderBottomColor="ui_elements_outlines_separators"
        width="100%"
        gap="1rem"
        alignItems={{ base: "flex-start", md: "center" }}
      >
        <Flex
          pl={profile?.accountType == "CONSULTANT" ? "0.5rem" : "0"}
          alignItems="center"
          gap="1.25rem"
        >
          <Avatar
            width={{ base: "4rem", sm: "4.5rem" }}
            height={{ base: "4rem", sm: "4.5rem" }}
            background="ui_secondary"
            color="black"
            icon={<HiOutlineUser size="2.5rem" />}
            position="relative"
            size="lg"
            name={
              profile?.firstName
                ? `${profile?.firstName} ${profile?.lastName}`
                : ""
            }
            src={profile?.avatarUrl}
          />
          <Stack gap="0.25rem">
            <Text
              whiteSpace="nowrap"
              fontSize={{ base: "md", sm: "xl" }}
              fontWeight="500"
              fontFamily="heading"
            >
              Welcome {profile?.firstName}!
            </Text>
            <Text opacity='0.5' lineHeight="normal" letterSpacing="-0.8px">
              {profile?.accountType == "CONSULTANT"
                ? "Here you will be able to find gigs best suitable for you. Populate your profile with description and skills to enable the recommendations"
                : "Here you will be able to find your created gigs and recommended candidates for them"}
            </Text>
          </Stack>
        </Flex>

        <Link href="/profile">
          <Flex gap="0.75rem" alignItems="center">
            <Text
              whiteSpace="nowrap"
              fontWeight="500"
              textTransform="uppercase"
            >
              View profile
            </Text>
            <HiOutlineArrowRight width="0.875rem" />
          </Flex>
        </Link>
      </Flex>
      {profile?.accountType == AccountType.CONSULTANT ? (
        <JobsSuggestionsList />
      ) : (
        <JobsList />
      )}
    </Stack>
  );
};

export default ProfileSection;
