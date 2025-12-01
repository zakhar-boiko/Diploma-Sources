import { FunctionComponent } from "react";
import { useFetchProfile } from "../../features/profile/api/client";
import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { HiOutlineArrowRight, HiOutlineUser } from "react-icons/hi";
import { PROFILE_LEVEL_VALUES_MAP } from "../../constants";
import { SuitableUserType } from "../../features/home/api/types";
import { Link } from "../Link/Link";

const CandidateItem: FunctionComponent<SuitableUserType> = ({
  accountType,
  avatarUrl,
  cvUrl,
  description,
  email,
  profileLevel,
  title,
  id,
  lastName,
  languages,
  firstName,
  skills,
  suitabilityPercentage,
}) => {
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return (
    <Flex width='100%' mt="0 !important" gap="1.5rem">
      <Avatar
        icon={<HiOutlineUser size="1rem" />}
        width="3rem"
        height="3rem"
        src={avatarUrl}
        bg="ui_secondary"
        name={fullName ? fullName : undefined}
      />
      <Stack
        flexGrow={1}
        gap="1.5rem"
        lineHeight="normal"
        letterSpacing="-0.8px"
      >
        <Stack gap={{ base: "0.5rem", md: "0.25rem" }}>
          <Text>{firstName}</Text>
          <Flex
            gap={{ base: "0.5rem", md: "1rem" }}
            mt="0 !important"
            width="100%"
            justifyContent="space-between"
            alignItems={{ base: "flex-start", md: "center" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Text
              fontFamily="heading"
              fontSize={{ base: "1.125rem", sm: "1.5rem" }}
              fontWeight="500"
              margin="0 !important"
              lineHeight={{ base: "1.5rem", sm: "2rem" }}
            >
              {title}
            </Text>
            <Flex
              flexWrap="wrap"
              gap={{ base: "0.75rem", sm: "1.5rem" }}
              alignItems="center"
            >
              <Flex flexWrap="wrap" gap="0.75rem">
                {profileLevel && (
                  <Box
                    borderRadius="0.25rem"
                    cursor="default"
                    textTransform="uppercase"
                    fontWeight="500"
                    fontSize="sm"
                    px="1.125rem"
                    py="0.5rem"
                    width="fit-content"
                    whiteSpace="nowrap"
                    bg="#F0F0F0"
                  >
                    {PROFILE_LEVEL_VALUES_MAP[profileLevel]}
                  </Box>
                )}

                {suitabilityPercentage && (
                  <Box
                    borderRadius="0.25rem"
                    cursor="default"
                    textTransform="uppercase"
                    fontWeight="500"
                    fontSize="sm"
                    px="1.125rem"
                    py="0.5rem"
                    width="fit-content"
                    bg="ui_accents_main"
                  >
                    {Math.round(suitabilityPercentage)}% match
                  </Box>
                )}
              </Flex>
            </Flex>
          </Flex>

          <Flex
            flexDirection={{ base: "column", md: "row" }}
            mt="0 !important"
            opacity="0.5"
            fontSize="sm"
            gap={{ base: "0.5rem", md: "1.25rem" }}
          >
            {(languages?.length ?? 0) > 0 && (
              <Flex>
                {languages
                  ?.map((language) => {
                    return `${language.name}`;
                  })
                  .join(", ")}
              </Flex>
            )}
          </Flex>
        </Stack>

        {(skills?.length ?? 0) > 0 && (
          <Flex mt="0 !important" flexWrap="wrap" gap="0.5rem">
            {skills?.map((skill) => {
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
                  {skill.name}
                </Box>
              );
            })}
          </Flex>
        )}
        <Link href={`/users/${id}`}>
          <Flex gap="0.75rem" alignItems="center">
            <Text
              whiteSpace="nowrap"
              fontWeight="500"
              textTransform="uppercase"
            >
              Visit profile
            </Text>
            <HiOutlineArrowRight width="1rem" />
          </Flex>
        </Link>
      </Stack>
    </Flex>
  );
};

export default CandidateItem;
