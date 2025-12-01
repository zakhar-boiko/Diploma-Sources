import { ChangeEvent, FunctionComponent, useState } from "react";
import DrawerBase from "../../../../components/DrawerBase/DrawerBase";
import { Button, Stack, Text, useToast } from "@chakra-ui/react";
import TextArea from "../../../../components/TextArea/TextArea";
import { useFetchProfile, useUpdateProfileMutation } from "../../api/client";

interface DescriptionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DescriptionDrawer: FunctionComponent<DescriptionDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: profile, refetch } = useFetchProfile();

  const [description, setDescription] = useState<string>(
    profile?.description ?? ""
  );

  const { mutate: updateProfile, isLoading } = useUpdateProfileMutation();

  const toast = useToast();

  const onSubmit = () => {
    updateProfile(
      {
        description: description,
      },
      {
        onSuccess: () => {
          refetch();
          toast({
            title: "The profile description was successfully updated",
            status: "success",
            duration: 1500,
            isClosable: true,
          });

          onClose();
        },
        onError() {
          toast({
            title:
              "Failed to update the profile description, please, try again",
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
            Add description
          </Text>
          <TextArea
            limit={2000}
            value={description}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(event.target.value.slice(0, 2000))
            }
          />
        </Stack>
        <Button
          isDisabled={isLoading || description.replaceAll(" ", "").length == 0}
          isLoading={isLoading}
          mt="0 !important"
          py="0.875rem"
          width="15rem"
          variant="regular"
          onClick={onSubmit}
        >
          Save
        </Button>
      </Stack>
    </DrawerBase>
  );
};

export default DescriptionDrawer;
