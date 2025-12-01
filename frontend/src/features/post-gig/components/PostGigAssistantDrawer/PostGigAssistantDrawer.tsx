import {
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import DrawerBase from "../../../../components/DrawerBase/DrawerBase";
import { AssistantMessageType } from "../../api/types";
import {
  useFillGigDataMutation,
  useSendAssistantMessageMutation,
} from "../../api/client";
import { HiOutlineArrowDown } from "react-icons/hi";
import PromptInput from "../PromptInput/PromptInput";
import MessageItem from "../MessageItem/MessageItem";
import { useFetchProfile } from "../../../profile/api/client";
import AssistantButton from "../AssistantButton/AssistantButton";
import { GigDataType } from "../../../gigs/api/types";

interface PostGigAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  setGigData: (data: GigDataType) => void;
}

const PostGigAssistantDrawer: FunctionComponent<
  PostGigAssistantDrawerProps
> = ({ isOpen, onClose, onOpen, setGigData }) => {
  const { data: profile } = useFetchProfile();
  const [chat, setChat] = useState<AssistantMessageType[]>([]);
  const [showScrollDownButton, setShowScrollDownButton] = useState(false);

  const { mutate: sendMessage, isLoading: isMessageSendLoading } =
    useSendAssistantMessageMutation();

  const { mutate: fillPositionData, isLoading: isFillPositionLoading } =
    useFillGigDataMutation();

  const toast = useToast();

  useEffect(() => {
    const timeout = setTimeout(scrollContainerToBottom, 100);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  const handleMessageSend = (value: string) => {
    sendMessage(
      [
        ...chat,
        {
          content: value,
          role: "USER",
        },
      ],

      {
        onSuccess: (data: AssistantMessageType) => {
          setChat((prevChat) => [
            ...prevChat.slice(0, -1),
            {
              ...data,
              displayType: "TEXT",
            },
          ]);
          handleScroll();
        },
        onError: () => {
          toast({
            title: "Failed to send message",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
          setChat((prevChat) => prevChat.slice(0, -1));
        },
      }
    );

    setChat((prevChat) => [
      ...prevChat,
      {
        content: value,
        role: "USER",
        // userName: `${profile?.firstName} ${profile?.lastName}`,
        // avatarUrl: profile?.avatarUrl,
      },
      {
        content: "Loading...",
        displayType: "LOADING",
        role: "ASSISTANT",
      },
    ]);

    scrollContainerToBottom();
  };

  const fillData = () => {
    fillPositionData(chat, {
      onSuccess: (data: GigDataType) => {
        setGigData(data);
        onClose();
      },
      onError: () => {
        toast({
          title: "Failed to fill position data",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      },
    });
    onClose();
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollContainerToBottom = () => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef?.current?.scrollTo({
          behavior: "smooth",
          top: containerRef?.current.scrollHeight,
        });
      }
    }, 50);

    setShowScrollDownButton(false);
  };

  const chatRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      setShowScrollDownButton(
        containerRef.current.scrollTop + containerRef.current.offsetHeight <
          containerRef.current.scrollHeight
      );
    }
  };

  return (
    <>
      <DrawerBase
        bodyStyle={{ padding: "4.5rem 2rem 2rem !important" }}
        isOpen={isOpen}
        onClose={onClose}
        style={{ maxHeight: "100vh", overflowY: "hidden" }}
      >
        <Stack height="100%" gap="2rem">
          <Stack maxH="100%" height="100%" flexGrow={1} gap="2.5rem">
            <Flex justifyContent="space-between" alignItems="center">
              <Text
                fontWeight="500"
                fontSize={{ base: "xl", sm: "2.25rem" }}
                padding="0"
                lineHeight="normal"
                fontFamily="heading"
              >
                Gig Assistant
              </Text>
              {chat[chat.length - 1]?.role == "ASSISTANT" &&
                chat[chat.length - 1]?.displayType !== "LOADING" && (
                  <Button
                    width="fit-content"
                    py="0.5rem"
                    ml="2.5rem !important"
                    variant="secondary"
                    gap="1.5rem"
                    onClick={fillData}
                    isLoading={isFillPositionLoading}
                  >
                    Use suggested data
                  </Button>
                )}
            </Flex>
            <Stack
              maxHeight="100%"
              overflowY="hidden"
              justifyContent="space-between"
              mt=" 0 !important"
              flexGrow={1}
              height="100%"
            >
              {chat.length > 0 ? (
                <Stack
                  maxHeight="100%"
                  flexShrink={1}
                  width="100%"
                  ref={containerRef}
                  overflowY="auto"
                  alignSelf="flex-end"
                  onWheel={handleScroll}
                  css={{
                    "&::-webkit-scrollbar-track": {
                      webkitBoxShadow: "inset 0 0 0.25rem rgba(0,0,0,0.3)",
                      backgroundColor: "#F5F5F5",
                    },
                    "&::-webkit-scrollbar": {
                      width: "0.35rem",
                      backgroundColor: "#F5F5F5",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#0000001A",
                      borderRadius: "1.25rem",
                    },
                  }}
                  flexGrow={1}
                  maxWidth="1320"
                  position="relative"
                  pb={{ base: "1.75rem", "2xl": "2.25rem" }}
                >
                  <Stack
                    width="100%"
                    gap="2rem"
                    justifyContent="flex-end"
                    minHeight="fit-content"
                    maxWidth="1320"
                    id="scrollableDiv"
                    overflowY="visible"
                    alignSelf="flex-end"
                    ref={chatRef}
                    flexGrow={1}
                  >
                    {chat.map((message, index, array) => {
                      return (
                        <MessageItem
                          isAnimated={
                            index == array.length - 1 &&
                            message.role == "ASSISTANT"
                          }
                          {...message}
                        />
                      );
                    })}
                  </Stack>
                  {/* {showScrollDownButton && (
                    <Box
                      width="0"
                      height="0"
                      position="sticky"
                      zIndex={10}
                      left="50%"
                      bottom="0rem"
                    >
                      <Button
                        onClick={() => setTimeout(scrollContainerToBottom, 10)}
                        variant="unstyled"
                        borderWidth="0.065rem"
                        borderColor="ui_dark"
                        background="ui_dark"
                        color="ui_light"
                        _hover={{
                          background: "ui_light",
                          color: "ui_dark",
                        }}
                        transition="all 0.3s"
                        minWidth="0"
                        minHeight="0"
                        width="2rem"
                        height="2rem"
                        rounded="50%"
                        bottom={{ base: "-1rem", "2xl": "-1.5rem" }}
                        position="absolute"
                      >
                        <Center>
                          <HiOutlineArrowDown size="1.25rem" />
                        </Center>
                      </Button>
                    </Box>
                  )} */}
                </Stack>
              ) : (
                <Center flexGrow={1} height="100%">
                  <Text
                    opacity="0.5"
                    letterSpacing="-0.8px"
                    lineHeight="normal"
                    maxWidth={462}
                    textAlign="center"
                  >
                    Describe the position you are looking for and the assistant
                    will help you fill the data.
                  </Text>
                </Center>
              )}

              <PromptInput
                onMessageSend={handleMessageSend}
                isLoading={isMessageSendLoading}
              />
            </Stack>
          </Stack>
        </Stack>
      </DrawerBase>
      {typeof profile !== "undefined" && profile !== null && (
        <AssistantButton onClick={onOpen} />
      )}
    </>
  );
};

export default PostGigAssistantDrawer;
