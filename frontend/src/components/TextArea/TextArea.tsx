import { ChangeEvent, FunctionComponent } from "react";

import { Stack, Text, Textarea } from "@chakra-ui/react";

interface TextAreaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  limit?: number;
}

const TextArea: FunctionComponent<TextAreaProps> = ({
  onChange,
  value,
  placeholder = "Type here...",
  limit,
}) => {
  return (
    <Stack width="100%" mt="0 !important" gap="0.5rem">
      <Textarea
        _focus={{
          borderColor: "ui_main",
        }}
        _hover={{
          borderColor: "ui_main",
        }}
        focusBorderColor="transparent"
        borderWidth="0.065rem"
        borderStyle="solid"
        borderColor="transparent"
        padding="1rem"
        minHeight="10.5rem"
        autoFocus={true}
        borderRadius="0.25rem"
        color="ui_dark"
        _placeholder={{
          opacity: "0.5",
          color: "ui_dark",
        }}
        backgroundColor="ui_main"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        css={{
          "&::-webkit-scrollbar-track": {
            webkitBoxShadow: "inset 0 0 0.25rem rgba(0,0,0,0.3)",
            backgroundColor: "#F5F5F5",
          },
          "&::-webkit-scrollbar": {
            width: "0.5rem",
            backgroundColor: "#F5F5F5",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#0000001A",
            borderRadius: "1.25rem",
          },
        }}
      />
      {limit && (
        <Text
          mt="0 !important"
          fontSize="sm"
          lineHeight="normal"
          opacity="0.5"
          letterSpacing="-0.6px"
          alignSelf="flex-end"
        >
          {value.length} / {limit}
        </Text>
      )}
    </Stack>
  );
};

export default TextArea;
