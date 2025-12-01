import { Avatar, Box, Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { HiOutlineInformationCircle, HiOutlineUser } from "react-icons/hi";
import { ClientType, ConsultantType } from "../../../profile/api/types";
import { PROFILE_LEVEL_VALUES_MAP } from "../../../../constants";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { useFetchProfile } from "../../../profile/api/client";

interface UserGeneralInfoSectionProps {
  user: ClientType | ConsultantType;
}

const UserGeneralInfoSection: FunctionComponent<
  UserGeneralInfoSectionProps
> = ({ user }) => {
  const { data: profile } = useFetchProfile();

  return (
    <Flex
      gap="2rem"
      flexWrap="wrap"
      alignItems="flex-end"
      justifyContent="space-between"
      pb="1.5rem"
      borderBottomWidth="0.065rem"
      borderColor="ui_elements_outlines_separators"
    >
      <Flex alignItems="center" gap="1.25rem">
        <Avatar
          src={user?.avatarUrl}
          background="#00000033"
          width="5rem"
          height="5rem"
          icon={<HiOutlineUser size="2rem" />}
        />
        <Stack gap="0.75rem">
          <Text
            fontFamily="heading"
            fontSize="2.25rem"
            lineHeight="normal"
            fontWeight="500"
          >
            {user?.firstName} {user?.lastName}
          </Text>
          <Text
            mt="0 !important"
            textTransform="uppercase"
            letterSpacing="-0.8px"
            lineHeight="normal"
          >
            {user?.title}
          </Text>
        </Stack>
      </Flex>
      <Flex gap="3rem" alignItems="center">
        <Stack
          alignItems="flex-end"
          gap="0.75rem"
          letterSpacing="-0.7px"
          fontSize="sm"
        >
          {"profileLevel" in user && user?.profileLevel && (
            <Box
              width="fit-content"
              borderRadius="0.25rem"
              border="0.065rem solid black"
              py="0.5rem"
              px="0.75rem"
              textTransform="uppercase"
            >
              {PROFILE_LEVEL_VALUES_MAP[user?.profileLevel ?? ""]}
            </Box>
          )}
          <Button
            variant="regular"
            width="10rem"
            margin="0 !important"
            py="0.75rem"
            height="fit-content"
            cursor="pointer"
            onClick={() =>
              window.location.assign(
                `mailto:${user.email}?subject=Hi, my name is ${
                  profile?.firstName + " " + profile?.lastName
                } and i am interested in your profile!`
              )
            }
          >
            Contact
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default UserGeneralInfoSection;
