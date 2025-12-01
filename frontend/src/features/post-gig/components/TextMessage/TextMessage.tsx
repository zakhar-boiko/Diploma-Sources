import { FunctionComponent, ReactNode, useCallback } from "react";

import { Box, SlideFade } from "@chakra-ui/react";
import AiResponseParser from "../AiResponseParser/AiResponseParser";


interface TextMessageProps {
  isAnimated: boolean;
  message: string;
}

const TextMessage: FunctionComponent<TextMessageProps> = ({
  isAnimated,
  message,
}) => {
  const container = useCallback(
    (children: ReactNode) => {
      return isAnimated ? (
        <SlideFade
          transition={{ enter: { duration: 0.3 }, exit: { duration: 0.5 } }}
          style={{
            willChange: "",
          }}
          in={isAnimated}
        >
          {children}
        </SlideFade>
      ) : (
        <>{children}</>
      );
    },
    [isAnimated]
  );

  return (
    <Box maxWidth="95%" mt="0 !Important">
      {container(<AiResponseParser variant="small" description={message} />)}
    </Box>
  );
};

export default TextMessage;
