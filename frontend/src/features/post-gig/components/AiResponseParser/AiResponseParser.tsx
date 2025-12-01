import { FunctionComponent, useMemo } from "react";

import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";

import { isNull } from "lodash";

interface AiResponseParserProps {
  description: string;
  variant?: "regular" | "small";
}

interface ParsedText {
  type: "REGULAR" | "BULLET" | "BOLD" | "ITALIC";
  content: string;
}

const typeToComponentMap = {
  BOLD: (content: string) => (
    <Text
      fontFamily="heading"
      fontSize="lg"
      lineHeight="normal"
      fontWeight="500"
      display="inline"
    >
      {content}
    </Text>
  ),
  ITALIC: (content: string) => (
    <Text fontStyle="italic" fontWeight="500">
      {content}
    </Text>
  ),
  BULLET: (content: string) => (
    <ListItem display="list-item" pl="0.75rem">
      {content}
    </ListItem>
  ),
  REGULAR: (content: string) => <Text display="inline"> {content}</Text>,
};

const typeToComponentMapSmall = {
  BOLD: (content: string) => (
    <Text lineHeight="normal" fontWeight="500" display="inline">
      {content}
    </Text>
  ),
  ITALIC: (content: string) => (
    <Text
      fontStyle="italic"
      display="inline-block"
      mt="0 !important"
      letterSpacing="-0.8px"
      whiteSpace="pre-wrap"
    >
      {content}
    </Text>
  ),
  BULLET: (content: string) => (
    <ListItem
      display="list-item"
      letterSpacing="-0.8px"
      whiteSpace="pre-wrap"
      pl="0.75rem"
    >
      {content}
    </ListItem>
  ),
  REGULAR: (content: string) => <Text display="inline">{content}</Text>,
 
};

const AiResponseParser: FunctionComponent<AiResponseParserProps> = ({
  description,
  variant = "regular",
}) => {
  const parsedDescription: ParsedText[][] = useMemo((): ParsedText[][] => {
    const parsedText: ParsedText[][] = [];

    const boldRegex = /\*\*(.+?)\*\*/g;
    const linkRegex = /##(.*?) (\S+?)##/g;
    const bulletRegex = /^\* (.+)$/gm;

    const lines = description.split("\n").filter((line) => line.length > 0);

    lines.forEach((line) => {
      let match;
      let parsedLine: ParsedText[] = [];
      let remainingText = line;

      // Process bullet points
      while ((match = bulletRegex.exec(remainingText)) !== null) {
        parsedLine.push({
          type: "BULLET",
          content: match[1].replaceAll("*", ""),
        });
        remainingText = remainingText.replace(match[0], "");
      }

      // Process links
      let lastIndex = 0;
      while ((match = linkRegex.exec(remainingText)) !== null) {
        if (match.index > lastIndex) {
          const beforeLink = remainingText.slice(lastIndex, match.index);
          if (beforeLink.trim()) {
            parsedLine.push({ type: "REGULAR", content: beforeLink.trim() });
          }
        }
        parsedLine.push({
          type: "REGULAR",
          content: match[0].replaceAll("#", ""),
        });
        lastIndex = match.index + match[0].length;
      }

      // Process bold text after links
      while ((match = boldRegex.exec(remainingText)) !== null) {
        if (match.index > lastIndex) {
          const beforeBold = remainingText.slice(lastIndex, match.index);
          if (beforeBold.trim()) {
            parsedLine.push({ type: "REGULAR", content: beforeBold.trim() });
          }
        }
        parsedLine.push({ type: "BOLD", content: match[1] });
        lastIndex = boldRegex.lastIndex;
      }

      // Remaining text after the last bold or link
      if (lastIndex < remainingText.length) {
        const afterText = remainingText.slice(lastIndex).trim();
        if (afterText) {
          parsedLine.push({ type: "REGULAR", content: afterText });
        }
      }

      parsedText.push(parsedLine);
    });

    return parsedText;
  }, [description]);

  return (
    <Box mt="0 !important">
      <UnorderedList
        mt="0 !important"
        pl="0.065rem"
        flexDir="column"
        display="flex"
        gap={variant == "regular" ? "1rem" : "0.75rem"}
        maxW={variant === "small" ? "95%" : "100%"}
      >
        {parsedDescription.map((line, lineIndex) => {
          const hasBullet = line.some((item) => item.type === "BULLET");
          const Wrapper = hasBullet ? Box : Text;

          return (
            <Wrapper
              key={lineIndex}
              ml={hasBullet ? undefined : "-1rem !important"}
              as={hasBullet ? "div" : "div"}
              sx={{ "& > *:not(:last-child)": { marginRight: "0.25rem" } }}
            >
              {line.map((item, itemIndex) => {
                const Component =
                  variant === "regular"
                    ? typeToComponentMap[item.type]
                    : typeToComponentMapSmall[item.type];
                return Component(item.content);
              })}
            </Wrapper>
          );
        })}
      </UnorderedList>
    </Box>
  );
};

export default AiResponseParser;
