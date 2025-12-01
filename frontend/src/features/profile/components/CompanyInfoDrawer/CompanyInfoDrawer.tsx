import { FunctionComponent, useState } from "react";
import DrawerBase from "../../../../components/DrawerBase/DrawerBase";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import TextInput from "../../../../components/TextInput/TextInput";
import {
  useFetchProfile,
  useUpdateSpecializedProfileMutation,
} from "../../api/client";
import { ClientType } from "../../api/types";
import NumberInputEditable from "../../../../components/NumberInputEditable/NumberInputEditable";

interface CompanyInfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CompanyData {
  company: string;
  businessArea: string;
  numberOfEmployees: number;
}

const CompanyInfoDrawer: FunctionComponent<CompanyInfoDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: profile, refetch } = useFetchProfile();

  const [formData, setFormData] = useState<CompanyData>({
    company: (profile as ClientType).company ?? "",
    numberOfEmployees: (profile as ClientType).numberOfEmployees ?? 0,
    businessArea: (profile as ClientType).businessArea ?? "",
  });

  const { mutate: updateProfile, isLoading } =
    useUpdateSpecializedProfileMutation();

  const toast = useToast();
  const onSubmit = () => {
    updateProfile(formData, {
      onSuccess() {
        refetch();
        toast({
          title: "The company info was successfully added",
          status: "success",
          duration: 1500,
          isClosable: true,
        });

        onClose();
      },
      onError() {
        toast({
          title: "Failed to add the company info, please, try again",
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
            Add company info
          </Text>
        </Stack>
        <Stack gap="2rem">
          <TextInput
            placeholder="Type here..."
            value={formData.company}
            name="company"
            title="company"
            onChange={(value: string) => {
              setFormData((prevData) => ({
                ...prevData,
                company: value,
              }));
            }}
          />
          <TextInput
            placeholder="Type here..."
            value={formData.businessArea}
            name="businessArea"
            title="Business area"
            onChange={(value: string) => {
              setFormData((prevData) => ({
                ...prevData,
                businessArea: value,
              }));
            }}
          />

          <Stack
            position="relative"
            width="100%"
            mt="0 !important"
            gap="0.75rem"
            letterSpacing="-0.8px"
          >
            <Text
              fontWeight="500"
              lineHeight="normal"
              textTransform="uppercase"
            >
              Number of employees
            </Text>
            <NumberInputEditable
              value={formData.numberOfEmployees}
              setValue={(value: number) =>
                setFormData((prevData) => ({
                  ...prevData,
                  numberOfEmployees: value,
                }))
              }
            />
          </Stack>
        </Stack>
        <Button
          onClick={onSubmit}
          isLoading={isLoading}
          isDisabled={isLoading}
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

export default CompanyInfoDrawer;
