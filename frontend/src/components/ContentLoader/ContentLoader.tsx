import { Center, Spinner } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface ContentLoaderProps {}

const ContentLoader: FunctionComponent<ContentLoaderProps> = () => {
  return (
    <Center padding={{ base: "2.5rem", sm: "3.75rem" }}>
      <Spinner color="black" size="md" />
    </Center>
  );
};

export default ContentLoader;
