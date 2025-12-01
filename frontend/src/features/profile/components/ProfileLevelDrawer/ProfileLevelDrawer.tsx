import { ChangeEvent, FunctionComponent, useState } from "react";
import DrawerBase from "../../../../components/DrawerBase/DrawerBase";
import { Button, SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react";
import { ProfileLevel } from "../../api/enums/enums";
import RadioInput from "../../../../components/RadioInput/RadioInput";
import {
  useFetchProfile,
  useUpdateSpecializedProfileMutation,
} from "../../api/client";

interface ProfileLevelDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileLevelDrawer: FunctionComponent<ProfileLevelDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [profileLevel, setProfileLevel] = useState<ProfileLevel>();

  const { refetch } = useFetchProfile();

  const { mutate: updateProfile, isLoading } =
    useUpdateSpecializedProfileMutation();

  const toast = useToast();

  const onSubmit = () => {
    updateProfile(
      {
        profileLevel: profileLevel,
      },
      {
        onSuccess() {
          refetch();
          toast({
            title: "The profile level was successfully added",
            status: "success",
            duration: 1500,
            isClosable: true,
          });

          onClose();
        },
        onError() {
          toast({
            title: "Failed to add the profile level, please, try again",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <DrawerBase isOpen={isOpen} onClose={onClose}>
      <Stack gap="3rem">
        <Stack gap="2rem">
          <Text
            fontWeight="500"
            fontSize={{ base: "xl", sm: "2.25rem" }}
            padding="0"
            lineHeight="normal"
            fontFamily="heading"
          >
            Add level of experience
          </Text>
          <SimpleGrid columns={{ lg: 2, xl: 3 }} gap="0.75rem">
            {Object.entries(ProfileLevel).map(([key, value]) => {
              return (
                <RadioInput
                  isChecked={profileLevel == (key as unknown)}
                  value={key}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setProfileLevel(event.target.value as keyof unknown)
                  }
                >
                  {value}
                </RadioInput>
              );
            })}
          </SimpleGrid>
        </Stack>

        <Button
          onClick={onSubmit}
          isLoading={isLoading}
          isDisabled={isLoading || !profileLevel}
          mt="1rem !important"
          variant="regular"
          width="14rem"
          py="0.875rem"
          lineHeight="normal"
        >
          Save
        </Button>
      </Stack>
    </DrawerBase>
  );
};

export default ProfileLevelDrawer;
