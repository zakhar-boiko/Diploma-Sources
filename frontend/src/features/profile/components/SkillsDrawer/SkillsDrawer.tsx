import { FunctionComponent, useState } from "react";
import DrawerBase from "../../../../components/DrawerBase/DrawerBase";
import { Button, Stack, Text, useToast } from "@chakra-ui/react";
import {
  useFetchAvailableSkills,
  useFetchProfile,
  useUpdateSkillsMutation,
} from "../../api/client";
import { ConsultantType } from "../../api/types";
import SearchableSelect from "../../../../components/SearchableSelect/SearchableSelect";

interface SkillsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SkillsDrawer: FunctionComponent<SkillsDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { mutate: updateProfileSkills, isLoading } = useUpdateSkillsMutation();

  const { data: profile, refetch } = useFetchProfile();

  const { data: availableSkills } = useFetchAvailableSkills();

  const [skills, setSkills] = useState<string[]>(
    (profile as ConsultantType)?.skills?.map((skill) => skill?.id) ?? []
  );

  const toast = useToast();

  const onSubmit = () => {
    updateProfileSkills(skills, {
      onSuccess: () => {
        refetch();
        toast({
          title: "The profile skills was successfully updated",
          status: "success",
          duration: 1500,
          isClosable: true,
        });

        onClose();
      },
      onError() {
        toast({
          title: "Failed to update the profile skills, please, try again",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      },
    });
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
            Add skills
          </Text>
          <SearchableSelect
            options={
              availableSkills?.map((skill) => {
                return {
                  value: skill.id,
                  label: skill.name,
                };
              }) ?? []
            }
            onChange={(value: string) =>
              setSkills(
                skills.includes(value)
                  ? skills.filter((skill) => skill !== value)
                  : [...skills, value]
              )
            }
            labelsEnum={availableSkills?.reduce((skillsMap, skill) => {
              return {
                ...skillsMap,
                [skill.id as string]: skill.name,
              };
            }, {})}
            placeHolder="Search for a skill"
            value={skills}
          />
        </Stack>
        <Button
          isDisabled={isLoading || skills.length == 0}
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

export default SkillsDrawer;
