import { FunctionComponent } from "react";

import { Box, Center, Stack } from "@chakra-ui/react";

interface ProgressProps {
  activeTabIndex: number;
  totalTabs: number;
}

const Progress: FunctionComponent<ProgressProps> = ({
  activeTabIndex,
  totalTabs,
}) => {
  return (
    <Stack
      gap="0"
      height="fit-content"
      position="sticky"
      top="0"
      paddingTop="5.25rem"
      alignItems="center"
    >
      {Array.from(Array(totalTabs).keys()).map((item, index, array) => {
        return (
          <>
            <Center
              margin="0 !important"
              borderRadius="50%"
              borderWidth="0.065rem"
              borderStyle="solid"
              borderColor="ui_dark"
              width="2rem"
              color={item <= activeTabIndex ? "ui_light" : "ui_dark"}
              opacity={item <= activeTabIndex ? "1" : "0.5"}
              background={item <= activeTabIndex ? "ui_dark" : "transparent"}
              fontWeight="500"
              sx={{ aspectRatio: "1" }}
            >
              {item + 1}
            </Center>
            {index < array.length - 1 && (
              <Box
                margin="0 !important"
                bg={item < activeTabIndex ? "ui_dark" : "ui_grey"}
                width="0.125rem"
                height="3rem"
              ></Box>
            )}
          </>
        );
      })}
    </Stack>
  );
};

export default Progress;
