import { FunctionComponent } from "react";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFetchProfile } from "../../features/profile/api/client";
import { HiArrowDown, HiOutlineArrowRight, HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Link } from "../Link/Link";

const ProfilePopover: FunctionComponent = ({}) => {
  const { data: profile } = useFetchProfile();
  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/auth/sign-in");
  };

  const navigate = useNavigate();

  return (
    <Popover>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              padding="0.25rem"
              pr="1rem"
              rounded="50px"
              border="0.065rem solid black"
              variant="ghost"
              transition="all 0.3s"
              fill="black"
              _hover={{
                bg: "black",
                color: "white",
                fill: "white",
              }}
              _active={{}}
            >
              <Flex alignItems="center" gap={{ base: "0.5rem", sm: "1rem" }}>
                <Flex alignItems="center" gap="0.5rem">
                  <Avatar
                    name={
                      profile
                        ? `${profile?.firstName} ${profile?.lastName}`
                        : undefined
                    }
                    background="ui_secondary"
                    color='black'
                    icon={<HiOutlineUser size="2rem" />}
                    src={profile?.avatarUrl}
                    size="sm"
                  />
                  <Text
                    textTransform="none"
                    fontWeight="400"
                    display={{ base: "none", sm: "block" }}
                  >
                    Your profile
                  </Text>
                </Flex>
                <Box
                  transition="transform 0.3s"
                  transform={`rotate(${isOpen ? -180 : 0}deg)`}
                >
                  <HiArrowDown size="1rem" fill="inherit" />
                </Box>
              </Flex>
            </Button>
          </PopoverTrigger>
          <PopoverContent right="5%" width="fit-content">
            <PopoverBody
              width="fit-content"
              color="black"
              padding="2.25rem"
              borderRadius="0.25rem"
              border="0.065rem solid black"
            >
              <Stack
                gap="1.25rem"
                divider={
                  <StackDivider
                    margin="0 !important"
                    bg="black"
                    height="0.065rem"
                  />
                }
              >
                <Box fontWeight="500">
                  <Text fontSize="1.25rem">
                    {profile?.firstName + " " + profile?.lastName}
                  </Text>
                  <Text
                    opacity="0.5"
                    textTransform="uppercase"
                    fontSize="0.75rem"
                  >
                    {profile?.title}
                  </Text>
                </Box>
                <Stack gap="1rem">
                  <Link
                    cursor="pointer"
                    href="/profile"
                    _hover={{ textDecoration: "underline" }}
                  >
                    View profile
                  </Link>
                  <Text
                    onClick={() => logout()}
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Sign out
                  </Text>
                </Stack>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default ProfilePopover;
