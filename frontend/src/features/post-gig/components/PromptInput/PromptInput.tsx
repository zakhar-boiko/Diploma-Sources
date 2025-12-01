import {
    ChangeEvent,
    FunctionComponent,
    KeyboardEvent,
    useMemo,
    useState,
  } from "react";
  import { HiOutlinePaperAirplane } from "react-icons/hi2";
  
  import { IconButton, Stack, Text, Textarea } from "@chakra-ui/react";
  
  interface PromptInputProps {
    onMessageSend: (value: string) => void;
    isLoading: boolean;
    placeholder?: string;
  }
  
  const PromptInput: FunctionComponent<PromptInputProps> = ({
    onMessageSend,
    isLoading,
    placeholder,
  }) => {
    const [prompt, setPrompt] = useState<string>("");
  
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && prompt.length > 0 && !isLoading) {
        e.preventDefault();
        onMessageSend(prompt);
        setPrompt("");
      }
    };
  
    const handleSendClick = () => {
      if (prompt.length > 0) {
        onMessageSend(prompt);
        setPrompt("");
      }
    };
  
  
    return (
      <Stack position="relative" width="100%" mt="0 !important" gap="0.5rem">
        <Textarea
          resize="none"
          _focus={{
            borderColor: "ui_main",
          }}
          _hover={{
            borderColor: "ui_main",
          }}
          focusBorderColor="transparent"
          onKeyDown={handleKeyDown}
          borderWidth="0.065rem"
          borderStyle="solid"
          borderColor="transparent"
          padding={{
            base: "1rem 3rem 1rem 1.5rem",
            "2xl": "1.5rem 3rem 1.5rem 1.5rem",
          }}
          height={{ base: "3.5rem", "2xl": "7.5rem" }}
          minHeight="0"
          autoFocus={true}
          borderRadius="0.75rem"
          letterSpacing="-0.8px"
          color="ui_dark"
          _placeholder={{
            opacity: "0.5",
            color: "ui_dark",
          }}
          backgroundColor="ui_main"
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setPrompt(event.target.value.slice(0, 2000))
          }
          value={prompt}
          placeholder={
            placeholder ?? `Type here...`
          }
          css={{
            "&::-webkit-scrollbar-track": {
              webkitBoxShadow: "inset 0 0 0.25rem rgba(0,0,0,0.3)",
              backgroundColor: "#F5F5F5",
            },
            "&::-webkit-scrollbar": {
              width: "0.25rem",
              backgroundColor: "#F5F5F5",
              background: "red",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#0000001A",
              borderRadius: "1.25rem",
            },
          }}
        />
        <Text
          mt="0 !important"
          fontSize="sm"
          lineHeight="normal"
          opacity="0.5"
          letterSpacing="-0.6px"
          alignSelf="flex-end"
        >
          {prompt.length} / 2000
        </Text>
        <IconButton
          zIndex={2}
          position="absolute"
          right={{ base: "1rem", "2xl": "1.5rem" }}
          top={{ base: "1rem", "2xl": "1rem" }}
          aria-label="send"
          height="fit-content"
          width="fit-content"
          opacity="0.5"
          _hover={{
            opacity: "1",
          }}
          minW="0"
          isLoading={isLoading}
          onClick={handleSendClick}
          icon={<HiOutlinePaperAirplane size="1.5rem" />}
          variant="unstyled"
        />
      </Stack>
    );
  };
  
  export default PromptInput;
  