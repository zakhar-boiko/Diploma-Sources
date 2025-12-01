import { Select, SingleValue, chakraComponents } from "chakra-react-select";
import { FunctionComponent, ReactNode } from "react";

import { IoClose } from "react-icons/io5";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { HiCheck, HiMagnifyingGlass } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi";

type OptionType = {
  label: string;
  value: string;
};

interface SearchableSelectProps {
  onChange: (value: string) => void;
  options: OptionType[];
  placeHolder: string;
  value: string[];
  name?: string;
  labelsEnum?: any;
  showSelected?: boolean;
}

const SearchableSelect: FunctionComponent<SearchableSelectProps> = ({
  onChange,
  options,
  placeHolder,
  value,
  labelsEnum,
  name,
  showSelected = true,
}) => {
  const isSelected = (option: OptionType) => {
    return value.includes(option.value);
  };
  
  return (
    <Stack mt="0 !important" gap="0.75rem">
      {name && (
        <Text
          textTransform="uppercase"
          fontWeight="500"
          letterSpacing="-0.8px"
          lineHeight="normal"
        >
          {name}
        </Text>
      )}
      <Box mt="0 !important" position="relative">
        <Box
          top="50%"
          left="1rem"
          transform="translateY(-50%)"
          position="absolute"
        >
          <HiMagnifyingGlass size="1.5rem" />
        </Box>

        <Select
          options={options}
          size="lg"
          value={[]}
          focusBorderColor="transparent"
          selectedOptionStyle={undefined}
          selectedOptionColorScheme="none"
          placeholder={placeHolder}
          closeMenuOnSelect={true}
          onChange={(newValue: SingleValue<{ value: string }>) =>
            onChange(newValue?.value ?? "")
          }
          colorScheme="black"
          hideSelectedOptions={false}
          isOptionSelected={(option: OptionType) => isSelected(option)}
          components={{
            Option: ({ children, ...props }: any) => (
              <chakraComponents.Option {...props}>
                <Flex
                  gap="0.5rem"
                  color="ui_semantic_positive"
                  alignItems="center"
                >
                  {props.isSelected && <HiCheck size="1.25rem" />}
                  <Text color="ui_dark">{props.data.label}</Text>
                </Flex>
              </chakraComponents.Option>
            ),
            NoOptionsMessage: ({ children, ...props }: any) => (
              <chakraComponents.NoOptionsMessage {...props}>
                <Text textAlign="start" letterSpacing="-0.8pxs" opacity="0.2">
                  No results found
                </Text>
              </chakraComponents.NoOptionsMessage>
            ),
            DropdownIndicator: ({ children, ...props }: any) => (
              <Box
                right="1.25rem"
                position="relative"
                transition="all 0.3s"
                {...props}
                transform={
                  props.isFocused
                    ? `rotate(${props.isFocused ? -180 : 180}deg)`
                    : ""
                }
              >
                <HiChevronDown width="1rem" />
              </Box>
            ),
          }}
          chakraStyles={{
            indicatorSeparator: (provided: any) => ({
              ...provided,
              p: 0,
              display: "none",
            }),

            inputContainer: (provided: any) => ({
              ...provided,
              padding: "0 !important",
            }),

            placeholder: (provided: any) => ({
              ...provided,
              color: "ui_dark",
              opacity: "0.5",
            }),

            input: (provided: any) => ({
              ...provided,
              padding: "0 !important",
            }),

            group: (provided: any) => ({
              ...provided,
              padding: "0 !important",
            }),

            option: (provided: any) => ({
              ...provided,
              opacity: 1,
              fontSize: "md",
              color: "ui_dark",
              padding: "0.75rem 1.25rem",
              background: "transparent",
            }),

            noOptionsMessage: (provided: any) => ({
              ...provided,
              opacity: 1,
              fontSize: "md",
              color: "ui_dark",
              padding: "0.75rem 1.25rem",
              background: "transparent",
            }),

            control: (provided: any, state: any) => ({
              ...provided,
              borderWidth: "0.065rem",
              borderStyle: "solid",
              borderColor: "transparent",
              background: "ui_main",
              paddingLeft: "2.5rem",
              borderRadius: "0.25rem !important",
              fontSize: "md",
              py: "1rem",
              lineHeight: "normal !important",
              width: "100%",
              letterSpacing: "-0.8px",
              _focus: {
                borderColor: "ui_elements_outlines_separators",
              },
            }),

            menu: (provided: any) => ({
              ...provided,
              marginTop: "2px",
              background: "ui_light",
              borderWidth: "0.065rem",
              borderStyle: "solid",
              borderColor: "ui_elements_outlines_separators",
              gap: "1.5rem",
              borderRadius: "0.25rem",
            }),
            menuList: (provided: any) => ({
              ...provided,
              border: "none",
              borderRadius: "0",
              letterSpacing: "-0.8px",
              background: "ui_main",

              padding: "0",
              "&::-webkit-scrollbar-track": {
                webkitBoxShadow: "inset 0 0 0.25rem rgba(0,0,0,0.3)",
                backgroundColor: "#F5F5F5",
              },
              "&::-webkit-scrollbar": {
                width: "0.25rem",
                backgroundColor: "#F5F5F5",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#0000001A",
                borderRadius: "1.25rem",
              },
            }),
          }}
        />
      </Box>
      {showSelected && (
        <Flex mt="0 !important" gap="0.25rem" flexWrap="wrap">
          {value.map((item) => {
            return (
              <Flex
                key={item}
                _hover={{
                  borderColor: "ui_dark",
                }}
                borderWidth="0.065rem"
                borderStyle="solid"
                borderColor="ui_elements_outlines_separators"
                transition="all 0.3s"
                color="ui_dark"
                padding="0.5rem"
                fontSize="sm"
                gap="0.5rem"
                borderRadius="0.25rem"
                lineHeight="normal"
                alignItems="center"
              >
                <Text>
                  {labelsEnum
                    ? labelsEnum[item as keyof typeof labelsEnum]
                    : item}
                </Text>
                <IoClose
                  onClick={() => onChange(item)}
                  opacity="0.5"
                  size="1rem"
                  cursor="pointer"
                />
              </Flex>
            );
          })}
        </Flex>
      )}
    </Stack>
  );
};

export default SearchableSelect;
