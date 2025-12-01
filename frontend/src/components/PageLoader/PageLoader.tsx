import { Center, Spinner } from "@chakra-ui/react";
export const PageLoader = () => {
  return (
    <Center
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      backgroundColor="ui_main"
    >
      <Spinner size="xl" aspectRatio={1} color="black" />
    </Center>
  );
};
