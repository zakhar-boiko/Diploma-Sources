import { FunctionComponent } from "react";
import { AssistantMessageType } from "../../api/types";
import { Avatar, Flex, forwardRef, Stack, Text } from "@chakra-ui/react";
import { HiOutlineSparkles, HiOutlineUser } from "react-icons/hi";
import TextMessage from "../TextMessage/TextMessage";

interface MessageItemProps extends AssistantMessageType {
  isAnimated: boolean;
}

const MessageItem = forwardRef<MessageItemProps, "div">(
  ({ content, role, isAnimated }, ref) => {
    return (
      <Flex
        ref={ref}
        gap="0.5rem"
        mt="0 !important"
        maxWidth="100%"
        overflowX="clip"
        pr="0.25rem"
        position="relative"
        transition="all 0.3s"
      >
        <Avatar
          width="2rem"
          height="2rem"
          background={role == "USER" ? "ui_grey" : "ui_accents_main"}
          color="black"
          icon={
            role == "USER" ? (
              <HiOutlineUser size="1.25rem" />
            ) : (
              <HiOutlineSparkles size="1rem" />
            )
          }
        />
        <Stack width="100%" maxW="100%" gap="0.5rem">
          <Text letterSpacing="-0.8px" lineHeight="normal" fontWeight="500">
            {role == "ASSISTANT" ? "Assistant" : "You"}
          </Text>

          <TextMessage isAnimated={isAnimated} message={content} />
        </Stack>
      </Flex>
    );
  }
);

export default MessageItem;
