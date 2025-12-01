import { FunctionComponent, useState } from "react";
import DrawerBase from "../../../../components/DrawerBase/DrawerBase";
import { Button, Stack, Text, useToast } from "@chakra-ui/react";
import {
  useFetchAvailableLanguages,
  useFetchProfile,
  useUpdateLanguagesMutation,
} from "../../api/client";
import { ConsultantType } from "../../api/types";
import SearchableSelect from "../../../../components/SearchableSelect/SearchableSelect";

interface LanguagesDrawerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const LanguagesDrawer: FunctionComponent<LanguagesDrawerDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { mutate: updateProfileLanguages, isLoading } =
    useUpdateLanguagesMutation();

  const { data: profile, refetch } = useFetchProfile();

  const { data: availableLanguages } = useFetchAvailableLanguages();

  const [languages, setLanguages] = useState<string[]>(
    (profile as ConsultantType)?.languages?.map((language) => language?.id) ?? []
  );

  const toast = useToast();

  const onSubmit = () => {
    updateProfileLanguages(languages, {
      onSuccess: () => {
        refetch();
        toast({
          title: "The profile languages was successfully updated",
          status: "success",
          duration: 1500,
          isClosable: true,
        });

        onClose();
      },
      onError() {
        toast({
          title: "Failed to update the profile languages please, try again",
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
            Add languages
          </Text>
          <SearchableSelect
            options={
              availableLanguages?.map((skill) => {
                return {
                  value: skill.id,
                  label: skill.name,
                };
              }) ?? []
            }
            onChange={(value: string) =>
              setLanguages(
                languages.includes(value)
                  ? languages.filter((skill) => skill !== value)
                  : [...languages, value]
              )
            }
            labelsEnum={availableLanguages?.reduce((languagesMap, language) => {
              return {
                ...languagesMap,
                [language.id as string]: language.name,
              };
            }, {})}
            placeHolder="Search for a language"
            value={languages}
          />
        </Stack>
        <Button
          isDisabled={isLoading || languages.length == 0}
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

export default LanguagesDrawer;
