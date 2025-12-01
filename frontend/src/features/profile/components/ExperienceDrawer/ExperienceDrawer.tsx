import { ChangeEvent, FunctionComponent, useState } from "react";
import DrawerBase from "../../../../components/DrawerBase/DrawerBase";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ExperienceType } from "../../api/types";
import { useAddExperience, useFetchProfile } from "../../api/client";
import dayjs from "dayjs";
import TextInput from "../../../../components/TextInput/TextInput";
import { HiChevronDown } from "react-icons/hi";
import TextArea from "../../../../components/TextArea/TextArea";

interface ExperienceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type ExperienceFormValues = {
  title: string;
  company: string;
  description: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isActive: boolean;
};

const generateYears = () => {
  const max = new Date().getFullYear();
  const min = max - 100;
  const years = [];

  for (let i = max; i >= min; i--) {
    years.push(i);
  }

  return years;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ExperienceDrawer: FunctionComponent<ExperienceDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { mutate: addExperience, isLoading } = useAddExperience();
  const { data: profile, refetch } = useFetchProfile();
  const currentDate = new Date();
  const [experience, setExperience] = useState<ExperienceFormValues>({
    company: "",
    description: "",
    isActive: false,
    startMonth: currentDate.getMonth().toString(),
    startYear: currentDate.getFullYear().toString(),
    title: "",
    endMonth: currentDate.getMonth().toString(),
    endYear: currentDate.getFullYear().toString(),
  });

  const toast = useToast();

  const onSubmit = () => {
    const startDate = dayjs(
      new Date(Number(experience.startYear), Number(experience.startMonth))
    );

    const endDate = dayjs(
      new Date(Number(experience.endYear), Number(experience.endMonth))
    );

    if (!experience.isActive && endDate.isBefore(startDate)) {
      toast({
        title:
          "The dates are invalid, please, make sure that start date comes before the end date",
        status: "error",
        duration: 1500,
        isClosable: true,
      });

      return;
    }

    addExperience(
      {
        ...experience,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      },
      {
        onSuccess: () => {
          refetch();
          toast({
            title: "The experience was successfully added",
            status: "success",
            duration: 1500,
            isClosable: true,
          });

          onClose();
        },
        onError() {
          toast({
            title: "Failed to add the experience, please, try again",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        },
      }
    );
  };

  const years = generateYears();

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
            Add experience
          </Text>
          <TextInput
            placeholder="Title"
            value={experience.title}
            name="title"
            title="Title"
            onChange={(value: string) => {
              setExperience((prevExperience) => ({
                ...prevExperience,
                title: value,
              }));
            }}
          />
          <TextInput
            placeholder="Company"
            value={experience.company}
            name="company"
            title="Company"
            onChange={(value: string) => {
              setExperience((prevExperience) => ({
                ...prevExperience,
                company: value,
              }));
            }}
          />
          <Stack gap="1.25rem">
            <Text
              textTransform="uppercase"
              as="h2"
              fontSize={{ base: "sm", sm: "md" }}
              letterSpacing="-0.8px"
              fontWeight="500"
            >
              Time period
            </Text>
            <Checkbox
              colorScheme="blackCheckbox"
              sx={{
                "> control": {
                  backgroundColor: "black !important",
                  color: "black",
                },
              }}
              checked={experience.isActive}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setExperience((prevExperience) => ({
                  ...prevExperience,
                  isActive: e.target.checked,
                }))
              }
            >
              I currently work here
            </Checkbox>
          </Stack>

          <Stack gap="0.75rem">
            <Text
              mb="1.25rem"
              textTransform="uppercase"
              as="h2"
              fontSize={{ base: "sm", sm: "md" }}
              letterSpacing="-0.8px"
              fontWeight="500"
              margin="0 !important"
            >
              FROM
            </Text>
            <HStack spacing={{ base: "0.75rem", sm: 6 }}>
              <Select
                value={experience.startMonth}
                focusBorderColor="ui_elements_outlines_separators"
                id="startDateMonth"
                _focus={{}}
                borderWidth="0.065rem"
                borderColor="ui_elements_outlines_separators"
                icon={<HiChevronDown size="1rem" fill="black" />}
                borderRadius="0.25rem"
                letterSpacing="-0.8px"
                sx={{
                  padding: "1.25rem",
                  height: "fit-content",
                  color: "black",
                  gap: "1.25rem",

                  "> option": {
                    backgroundColor: "white",
                    height: "2.5rem",
                    padding: "1.25rem",
                  },
                }}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setExperience((prevExperience) => ({
                    ...prevExperience,
                    startMonth: e.target.value,
                  }))
                }
              >
                {months.map((month, idx) => (
                  <option
                    style={{ backgroundColor: "white" }}
                    key={month}
                    value={idx}
                  >
                    {month}
                  </option>
                ))}
              </Select>

              <Select
                value={experience.startYear}
                focusBorderColor="ui_elements_outlines_separators"
                iconColor="black"
                _focus={{}}
                icon={<HiChevronDown size="1rem" fill="black" />}
                borderWidth="0.065rem"
                borderColor="ui_elements_outlines_separators"
                borderRadius="0.25rem"
                letterSpacing="-0.8px"
                sx={{
                  padding: "1.25rem",
                  height: "fit-content",
                  color: "black",
                  gap: "1.25rem",

                  "> option": {
                    backgroundColor: "white",
                    height: "2.5rem",
                    padding: "1.25rem",
                  },
                }}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setExperience((prevExperience) => ({
                    ...prevExperience,
                    startYear: e.target.value,
                  }))
                }
              >
                {years.map((year) => (
                  <option
                    style={{ backgroundColor: "white" }}
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>
                ))}
              </Select>
            </HStack>
          </Stack>
          {!experience.isActive && (
            <Stack gap="0.75rem">
              <Text
                mb="1.25rem"
                textTransform="uppercase"
                as="h2"
                fontSize={{ base: "sm", sm: "md" }}
                letterSpacing="-0.8px"
                fontWeight="500"
                margin="0 !important"
              >
                TO
              </Text>
              <HStack mt="0 !important" gap="1rem">
                <Select
                  value={experience.endMonth}
                  focusBorderColor="ui_elements_outlines_separators"
                  iconColor="black"
                  _focus={{}}
                  icon={<HiChevronDown size="1rem" fill="black" />}
                  borderWidth="0.065rem"
                  borderColor="ui_elements_outlines_separators"
                  borderRadius="0.25rem"
                  letterSpacing="-0.8px"
                  sx={{
                    padding: "1.25rem",
                    height: "fit-content",
                    color: "black",
                    gap: "1.25rem",

                    "> option": {
                      backgroundColor: "white",
                      height: "2.5rem",
                      padding: "1.25rem",
                    },
                  }}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setExperience((prevExperience) => ({
                      ...prevExperience,
                      endMonth: e.target.value,
                    }))
                  }
                >
                  {months.map((month, idx) => (
                    <option
                      style={{ backgroundColor: "white" }}
                      key={idx}
                      value={idx}
                    >
                      {month}
                    </option>
                  ))}
                </Select>
                <Select
                  value={experience.endYear}
                  focusBorderColor="ui_elements_outlines_separators"
                  iconColor="black"
                  _focus={{}}
                  icon={<HiChevronDown size="1rem" fill="black" />}
                  borderWidth="0.065rem"
                  borderColor="ui_elements_outlines_separators"
                  borderRadius="0.25rem"
                  letterSpacing="-0.8px"
                  sx={{
                    padding: "1.25rem",
                    height: "fit-content",
                    color: "black",
                    gap: "1.25rem",

                    "> option": {
                      backgroundColor: "white",
                      height: "2.5rem",
                      padding: "1.25rem",
                    },
                  }}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setExperience((prevExperience) => ({
                      ...prevExperience,
                      endYear: e.target.value,
                    }))
                  }
                >
                  {years.map((year) => (
                    <option
                      style={{ backgroundColor: "white" }}
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  ))}
                </Select>
              </HStack>
            </Stack>
          )}
          <Stack gap="0.75rem">
            <Text
              mb="1.25rem"
              textTransform="uppercase"
              as="h2"
              fontSize={{ base: "sm", sm: "md" }}
              letterSpacing="-0.8px"
              fontWeight="500"
              margin="0 !important"
            >
              What you did
            </Text>
            <TextArea
              limit={255}
              value={experience.description}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setExperience((prevExperience) => ({
                  ...prevExperience,
                  description: event.target.value.slice(0, 255),
                }))
              }
            />
          </Stack>
        </Stack>
        <Button
          isDisabled={
            isLoading ||
            experience.title.replaceAll(" ", "").length == 0 ||
            experience.company.replaceAll(" ", "").length == 0 ||
            experience.description.replaceAll(" ", "").length == 0
          }
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

export default ExperienceDrawer;
