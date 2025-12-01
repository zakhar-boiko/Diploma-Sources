import dayjs from "dayjs";
import { FunctionComponent, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ClientType, ConsultantType } from "../../api/types";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { uploadAvatarModalSlice } from "../../../../state/UploadAvatarDrawerState";
import { ProfileAvatar } from "../ProfileAvatar/ProfileAvatar";
import { PROFILE_LEVEL_VALUES_MAP } from "../../../../constants";
import CropImageModal from "../UploadAvatarModal/UploadAvatarModal";
import { actionsProfileInfoSlice } from "../../../../state/ActionsProfileInfoState";
import { HiOutlinePlus } from "react-icons/hi";
import ProfileLevelDrawer from "../ProfileLevelDrawer/ProfileLevelDrawer";
import { AccountType, ProfileLevel } from "../../api/enums/enums";

interface ProfileGeneralInfoProps {
  profile?: ConsultantType | ClientType | null;

  refetch: () => void;
}

const ProfileGeneralInfo: FunctionComponent<ProfileGeneralInfoProps> = ({
  profile,
  refetch,
}) => {
  const dispatch = useAppDispatch();

  const onChangeAvatar = (file: File) => {
    dispatch(uploadAvatarModalSlice.actions.setFile(file));

    dispatch(
      uploadAvatarModalSlice.actions.toggleDrawer({
        isOpen: true,
      })
    );
  };

  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ");

  const { actionsProfileInfo } = useAppSelector((state) => state.main);

  return (
    <>
      <Flex
        width="100%"
        pb="1.5rem"
        borderBottomWidth="0.065rem"
        borderColor="ui_elements_outlines_separators"
      >
        {profile && (
          <Flex
            flexWrap="wrap"
            gap="1.5rem"
            alignItems="flex-end"
            width="100%"
            justifyContent="space-between"
          >
            <Flex alignItems="center" gap="1.25rem">
              <ProfileAvatar
                onChangeAvatar={onChangeAvatar}
                avatarSrc={profile.avatarUrl}
              />

              <Stack gap="0.5rem">
                <Text
                  fontFamily="heading"
                  fontWeight="500"
                  lineHeight="normal"
                  fontSize={{ base: "1.125rem", sm: "2.25rem" }}
                >
                  {fullName}
                </Text>
                <Text
                  mt="0 !important"
                  textTransform="uppercase"
                  letterSpacing="-0.8px"
                  lineHeight="normal"
                >
                  {profile?.title}
                </Text>
              </Stack>
            </Flex>

            {profile.accountType == AccountType.CONSULTANT && (
              <>
                {"profileLevel" in profile && profile?.profileLevel ? (
                  <Box
                    cursor="default"
                    padding="0.5rem"
                    textTransform="uppercase"
                    letterSpacing="-0.7px"
                    fontSize="sm"
                    background="transparent"
                    border="0.065rem solid black"
                    borderRadius="0.25rem"
                    _hover={{
                      background: "white",
                      border: "0.065rem solid black",
                    }}
                    transition="all 0.3s"
                    whiteSpace="nowrap"
                  >
                    {PROFILE_LEVEL_VALUES_MAP[profile.profileLevel]}
                  </Box>
                ) : (
                  <Button
                    variant="secondary"
                    gap="0.75rem"
                    py="0.5rem"
                    fontSize="sm"
                    leftIcon={<HiOutlinePlus size="1rem" />}
                    onClick={() =>
                      dispatch(
                        actionsProfileInfoSlice.actions.toggleModal({
                          profileLevelOpen: true,
                        })
                      )
                    }
                    iconSpacing="0"
                  >
                    {"Profile level"}
                  </Button>
                )}
              </>
            )}
          </Flex>
        )}
      </Flex>
      <CropImageModal
        refetch={refetch}
        dimensions={{ width: 10, height: 10 }}
      />
      <ProfileLevelDrawer
        isOpen={actionsProfileInfo.profileLevelOpen || false}
        onClose={() =>
          dispatch(
            actionsProfileInfoSlice.actions.toggleModal({
              profileLevelOpen: false,
            })
          )
        }
      />
    </>
  );
};

export default ProfileGeneralInfo;
