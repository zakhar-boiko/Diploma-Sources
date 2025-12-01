import { ChangeEvent, FunctionComponent, useState } from "react";

import { IconButton, Input, Stack, StyleProps, Text } from "@chakra-ui/react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface TextInputProps {
  name: string;
  title?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isHiddable?: boolean;
  style?: StyleProps;
}

const TextInput: FunctionComponent<TextInputProps> = ({
  name,
  onChange,
  placeholder,
  title,
  value,
  isHiddable = false,
  style,
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(isHiddable);

  return (
    <Stack
      position="relative"
      width="100%"
      mt="0 !important"
      gap="0.75rem"
      letterSpacing="-0.8px"
    >
      {title && (
        <Text fontWeight="500" lineHeight="normal" textTransform="uppercase">
          {title}
        </Text>
      )}
      <Input
        mt="0 !important"
        _focus={{
          borderColor: "ui_elements_outlines_separators",
        }}
        focusBorderColor="transparent"
        name={name}
        borderWidth="0.065rem"
        borderStyle="solid"
        borderColor="transparent"
        py="1.75rem"
        px="1rem"
        type={isHidden ? "password" : "text"}
        pr={isHiddable ? "2.5rem" : "1rem"}
        borderRadius="0.25rem"
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        color="ui_dark"
        _placeholder={{
          opacity: "0.5",
          color: "ui_dark",
        }}
        backgroundColor="ui_main"
        {...style}
      />

      {isHiddable && (
        <IconButton
          position="absolute"
          variant="unstyled"
          transform="translateY(-50%)"
          width="fit-content"
          minW="0"
          top="50%"
          right="1rem"
          aria-label="hide"
          opacity="0.5"
          _hover={{
            opacity: 1,
          }}
          onClick={() => setIsHidden((prevHidden) => !prevHidden)}
          icon={
            isHidden ? (
              <HiOutlineEye size="1.5rem" />
            ) : (
              <HiOutlineEyeOff size="1.5rem" />
            )
          }
        />
      )}
    </Stack>
  );
};

export default TextInput;
