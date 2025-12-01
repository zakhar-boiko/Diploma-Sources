import { FunctionComponent, useState } from "react";
import DrawerBase from "../../../../components/DrawerBase/DrawerBase";
import {
  Button,
  Center,
  Flex,
  IconButton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFetchProfile, useUploadCvMutation } from "../../api/client";
import {
  HiOutlineArrowUpTray,
  HiOutlineTrash,
  HiOutlineDocument,
} from "react-icons/hi2";
import { FileUploader } from "react-drag-drop-files";

interface CvDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CvDrawer: FunctionComponent<CvDrawerProps> = ({ isOpen, onClose }) => {
  const { data: profile, refetch } = useFetchProfile();

  const toast = useToast();

  const [file, setFile] = useState<File>();

  const { mutate: uploadCv, isLoading } = useUploadCvMutation();

  const onSubmit = () => {
    if (file) {
      let formData = new FormData();
      formData.append("folder", "files");
      formData.append("file", file);

      uploadCv(formData, {
        onSuccess() {
          refetch();
          toast({
            title: "The profile Cv was successfully added",
            status: "success",
            duration: 1500,
            isClosable: true,
          });

          onClose();
        },
        onError() {
          toast({
            title: "Failed to add the profile Cv, please, try again",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        },
      });
    }
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
            Upload CV
          </Text>
          {file ? (
            <Flex
              mt="0 !important"
              borderRadius="0.25rem"
              justifyContent="space-between"
              alignItems="center"
              p="2.375rem"
              borderWidth="0.065rem"
              borderStyle="solid"
              borderColor="ui_elements_outlines_separators"
            >
              <Flex alignItems="center" gap="1.25rem">
                <HiOutlineDocument size="1.5rem" />

                <Text
                  fontWeight="500"
                  lineHeight="1.25rem"
                  letterSpacing="-0.8px"
                >
                  {file.name}
                </Text>
              </Flex>

              <IconButton
                onClick={() => setFile(undefined)}
                minWidth="0"
                variant="unstyled"
                aria-label="remove"
                icon={<HiOutlineTrash size="1.5rem" opacity="0.5" />}
                rounded="50%"
                width="1.5rem"
                height="1.5rem"
              />
            </Flex>
          ) : (
            <FileUploader
              onSizeError={() =>
                toast({
                  title: "The file is to big",
                  description: "Please, pick a smaller file",
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                })
              }
              maxSize={20}
              children={
                <Center
                  cursor="pointer"
                  width="100%"
                  height="300px"
                  borderWidth="0.065rem"
                  borderStyle="dashed"
                  borderColor="ui_elements_outlines_separators"
                  bg="ui_main"
                  rounded="0.25rem"
                >
                  <Stack gap="1.5rem" alignItems="center">
                    <HiOutlineArrowUpTray size="2.5rem" />

                    <Stack alignItems="center" lineHeight="normal" width="100%">
                      <Flex
                        gap="0.5rem"
                        fontSize={{ base: "md", sm: "lg" }}
                        fontFamily="heading"
                        fontWeight="500"
                        letterSpacing="-1px"
                      >
                        <Text>Drag & drop to upload </Text>
                        <Text
                          textDecor="underline"
                          textDecorationThickness="0.065rem"
                          textUnderlineOffset="0.125rem"
                        >
                          or browse
                        </Text>
                      </Flex>

                      <Text fontSize="sm" letterSpacing="-0.7px" opacity="0.5">
                        Format: .pdf | Max size: 20mb
                      </Text>
                    </Stack>
                  </Stack>
                </Center>
              }
              name="file"
              types={["pdf"]}
              handleChange={(file: File) => setFile(file)}
            />
          )}
          <Button
            onClick={onSubmit}
            isLoading={isLoading}
            isDisabled={isLoading || !file}
            mt="1rem !important"
            variant="regular"
            width="14rem"
            py="0.875rem"
            lineHeight="normal"
          >
            Save File
          </Button>
        </Stack>
      </Stack>
    </DrawerBase>
  );
};

export default CvDrawer;
