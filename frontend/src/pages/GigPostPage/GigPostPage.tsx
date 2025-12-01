import {
  Button,
  Flex,
  Stack,
  StackDivider,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GigDataType, GigType } from "../../features/gigs/api/types";
import { useAddGigMutation } from "../../features/post-gig/api/client";
import Progress from "../../features/post-gig/components/Progress/Progress";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import OverallInfo from "../../features/post-gig/components/OverallInfo/OverallInfo";
import SkillsInfoSection from "../../features/post-gig/components/SkillsInfoSection/SkillsInfoSection";
import GigDescriptionSection from "../../features/post-gig/components/GigDescriptionSection/GigDescriptionSection";
import PostGigAssistantDrawer from "../../features/post-gig/components/PostGigAssistantDrawer/PostGigAssistantDrawer";

interface GigPostPageProps {}

const DEFAULT_GIG_DATA: GigDataType = {
  description: "",
  languages: [],
  profileLevel: undefined,
  skills: [],
  title: "",
};

const GigPostPage: FunctionComponent<GigPostPageProps> = () => {
  const navigate = useNavigate();
  const {
    isOpen: isPostGigAssistantDrawerOpen,
    onOpen: onOpenPostGigAssistantDrawer,
    onClose: onClosePostGigAssistantDrawer,
  } = useDisclosure();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [disabledNext, setDisabledNext] = useState<boolean>(true);

  const [gigData, setGigData] = useState<GigDataType>(DEFAULT_GIG_DATA);
  const { mutate: addGig, isLoading: isLoadingCreate } = useAddGigMutation();

  const toast = useToast();

  useEffect(() => {
    switch (tabIndex) {
      case 0: {
        setDisabledNext(
          gigData.title.replaceAll(" ", "").length < 2 || !gigData.profileLevel
            ? true
            : false
        );
        break;
      }
      case 1: {
        setDisabledNext(
          !gigData.skills.length || !gigData.languages.length ? true : false
        );
        break;
      }
      case 2: {
        setDisabledNext(
          !gigData.description.replaceAll(" ", "").length ? true : false
        );
        break;
      }
    }
  }, [tabIndex, gigData]);

  const onSubmit = () => {
    addGig(
      gigData,

      {
        onSuccess: (data: GigType) => {
          toast({
            title: "The gig was successfully added",
            status: "success",
            duration: 1500,
            isClosable: true,
          });
          navigate(`/gigs/${data.id}`);
        },

        onError: () => {
          toast({
            title: "Failed to add the gig, please, try again",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        },
      }
    );
  };
  return (
    <>
      <Stack
        divider={
          <StackDivider
            margin="0 !important"
            borderColor="ui_elements_outlines_separators"
          />
        }
        gap="2rem"
        maxW={1492}
        width="100%"
        alignSelf="center"
        flexGrow={1}
        position="relative"
      >
        <Text
          fontFamily="heading"
          fontSize={{ base: "1.5rem", sm: "3rem" }}
          fontWeight="500"
          lineHeight="normal"
        >
          Add new gig
        </Text>
        <Flex maxWidth={1216} justifyContent="flex-end">
          <Flex
            justifyContent="space-between"
            position="relative"
            maxWidth={1110}
            width="100%"
            gap="2rem"
          >
            <Progress activeTabIndex={tabIndex} totalTabs={3} />
            <Stack width="100%" gap="3rem">
              <Tabs maxWidth={948} index={tabIndex}>
                <TabPanels>
                  <TabPanel p={0}>
                    <OverallInfo gigData={gigData} setGigData={setGigData} />
                  </TabPanel>
                  <TabPanel p={0}>
                    <SkillsInfoSection
                      skills={gigData.skills}
                      setSkills={(skills: string[]) =>
                        setGigData((prevGigData) => ({
                          ...prevGigData,
                          skills: skills,
                        }))
                      }
                      languages={gigData.languages}
                      setLanguages={(language: string[]) =>
                        setGigData((prevGigData) => ({
                          ...prevGigData,
                          languages: language,
                        }))
                      }
                    />
                  </TabPanel>

                  <TabPanel p={0}>
                    <GigDescriptionSection
                      gigData={gigData}
                      setGigData={setGigData}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Flex mt="0 !important" gap="0.75rem" maxWidth={404}>
                {tabIndex > 0 && (
                  <Button
                    leftIcon={<HiArrowLongLeft size="1.5rem" />}
                    flexGrow={1}
                    flexBasis={0}
                    variant="secondary"
                    onClick={() => {
                      setTabIndex((prevTabIndex) => prevTabIndex - 1);
                    }}
                  >
                    Back
                  </Button>
                )}
                <Button
                  flexGrow={1}
                  maxWidth={196}
                  isDisabled={disabledNext}
                  onClick={() => {
                    tabIndex < 2
                      ? setTabIndex((prevTabIndex) => prevTabIndex + 1)
                      : onSubmit();
                  }}
                  isLoading={isLoadingCreate}
                  flexBasis={0}
                  rightIcon={
                    tabIndex < 3 ? (
                      <HiArrowLongRight size="1.5rem" />
                    ) : undefined
                  }
                  height="100%"
                  variant="regular"
                >
                  {tabIndex < 2 ? "Next" : "Finish"}
                </Button>
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Stack>
      <PostGigAssistantDrawer
        setGigData={setGigData}
        isOpen={isPostGigAssistantDrawerOpen}
        onOpen={onOpenPostGigAssistantDrawer}
        onClose={onClosePostGigAssistantDrawer}
      />
    </>
  );
};

export default GigPostPage;
