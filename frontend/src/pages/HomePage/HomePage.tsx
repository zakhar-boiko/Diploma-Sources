import { Center, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import ProfileSection from "../../features/home/components/ProfileSection/ProfileSection";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {

  return (
    <Center flexGrow={1}>
      <ProfileSection/>
   
    </Center>
  );
};

export default HomePage;
