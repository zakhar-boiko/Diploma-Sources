import {
    IconButton,
    keyframes,
    Tooltip,
    useBreakpointValue,
  } from "@chakra-ui/react";
  import { FunctionComponent } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
  
  interface AssistantButtonProps {
    onClick: () => void;
  }
  
  const AssistantButton: FunctionComponent<AssistantButtonProps> = ({
    onClick,
  }) => {
  
    const assistantButtonSize = useBreakpointValue({
      base: "1.5rem",
      "2xl": "2.5rem",
    });
  
    const animationShadowSize = useBreakpointValue({
      base: "0.75rem",
      "2xl": "1.25rem",
    });
  
    const buttonAnimation = keyframes`  
      0% {
          transform: scale(0.85);
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
      }
  
      70% {
          transform: scale(1);
          box-shadow: 0 0 0 ${animationShadowSize} rgba(0, 0, 0, 0);
      }
  
      100% {
          transform: scale(0.85);
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
      }
    `;
  
    return (
      <Tooltip
        placement="left-start"
        bg="ui_grey"
        color="black"
        boxShadow="none"
        fontSize="sm"
        textTransform="uppercase"
        letterSpacing="-0.7px"
        px="0.65rem"
        py="0.5rem"
        borderRadius="0.75rem 0.75rem 0 0.75rem"
        bottom={{ base: "1.875rem", "2xl": "0.75rem" }}
        right="-0.5rem"
        label="Assistant"
      >
        <IconButton
          zIndex={100}
          animation={`${buttonAnimation} 1.5s infinite`}
          aria-label="chat-open"
          onClick={onClick}
          bottom={{ base: "1rem", "2xl": "3rem" }}
          position="fixed"
          right={{ base: "1rem", "2xl": "2rem" }}
          bg="ui_accents_main"
          rounded="50%"
          width={{ base: "3.75rem", "2xl": "5.625rem" }}
          height={{ base: "3.75rem", "2xl": "5.625rem" }}
          stroke="ui_dark"
          transition="all 0.3s"
          _hover={{
            background: "ui_accents_main",
            stroke: "ui_dark",
          }}
          icon={<HiOutlineSparkles size={assistantButtonSize} stroke="inherit" />}
        />
      </Tooltip>
    );
  };
  
  export default AssistantButton;
  