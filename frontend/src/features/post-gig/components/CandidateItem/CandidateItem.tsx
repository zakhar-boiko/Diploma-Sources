import { FunctionComponent, useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Center,
  Flex,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";

import { ConsultantType } from "../../../profile/api/types";
import { SuitableUserType } from "../../../home/api/types";
import { HiOutlineUser } from "react-icons/hi";
import { Link } from "../../../../components/Link/Link";

const CandidateItem: FunctionComponent<SuitableUserType> = ({
  avatarUrl,
  firstName,
  id,
  title,
  suitabilityPercentage,
}) => {
  return (
    <Flex
      fontSize={{ base: "sm", sm: "md" }}
      letterSpacing="-0.8px"
      gap="0.75rem"
    >
      <Avatar
        src={avatarUrl}
        icon={<HiOutlineUser />}
        width="2.5rem"
        height="2.5rem"
        objectFit="cover"
        bg="ui_secondary"
        objectPosition="center"
      />
      <Stack gap="0.75rem">
        <Box>
          <Link href={`/users/${id}`} lineHeight="1.25rem">
            {firstName}
          </Link>
          <Text
            lineHeight="1.25rem"
            fontFamily="heading"
            fontWeight="500"
            mt="0.125rem !important"
          >
            {title}
          </Text>
        </Box>

        <Center
          cursor="default"
          py="0.5rem"
          width="7rem"
          borderRadius="0.25rem"
          fontWeight="500"
          backgroundColor="ui_accents_main"
          whiteSpace="nowrap"
        >
          {Math.round(suitabilityPercentage ?? 0)}% match
        </Center>
      </Stack>
    </Flex>
  );
};

export default CandidateItem;
