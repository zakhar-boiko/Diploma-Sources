import { FunctionComponent } from "react";
import { ConsultantType } from "../../api/types";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store/hooks";
import ProfileSection from "../ProfileSection/ProfileSection";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { actionsProfileInfoSlice } from "../../../../state/ActionsProfileInfoState";
import { formatDate } from "../../../../utils";
import ExperienceDrawer from "../ExperienceDrawer/ExperienceDrawer";

interface ExperienceSectionProps {
  profile: ConsultantType;
  isEditable?: boolean;
}

const ExperienceSection: FunctionComponent<ExperienceSectionProps> = ({
  profile,
  isEditable,
}) => {
  const dispatch = useDispatch();

  const { actionsProfileInfo } = useAppSelector((state) => state.main);

  return (
    <>
      <ProfileSection
        rightElement={
          isEditable ? (
            <Button
              variant="secondary"
              gap="0.75rem"
              py="0.5rem"
              fontSize="sm"
              width="7.5rem"
              leftIcon={<HiOutlinePlus size="1rem" />}
              onClick={() =>
                dispatch(
                  actionsProfileInfoSlice.actions.toggleModal({
                    experienceOpen: true,
                  })
                )
              }
              iconSpacing="0"
            >
              {"Add"}
            </Button>
          ) : undefined
        }
        title={"Experience"}
        hasBorder={true}
      >
        {profile.experiences?.length ? (
          <Stack
            width="100%"
            fontSize={{ base: "sm", sm: "md" }}
            spacing={{ base: "1.5rem", sm: "2rem" }}
          >
            {profile.experiences.map((exp, index, array) => (
              <Stack
                pb={index !== array.length - 1 ? "1.25rem" : "0"}
                borderBottomWidth={
                  index !== array.length - 1 ? "0.065rem" : "none"
                }
                borderColor="ui_elements_outlines_separators"
                gap="1.25rem"
                key={exp.id}
                minH={10}
                alignItems="flex-start"
                letterSpacing="-0.8px"
              >
                <Flex
                  width="100%"
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <Stack lineHeight="normal">
                    <Text
                      textTransform="uppercase"
                      lineHeight="normal"
                      fontWeight="500"
                    >
                      {exp.title}
                    </Text>
                    <Text mt="0.5rem">{exp.company}</Text>
                    <Text mt="0.25rem !important" opacity="0.5">
                      {formatDate(exp.startDate as string, "MMMM, YYYY")}
                      <Box as="span" mx={1}>
                        -
                      </Box>
                      {exp.endDate && !exp.isActive
                        ? formatDate(exp.endDate as string, "MMMM, YYYY")
                        : "Current time"}
                    </Text>
                  </Stack>
                </Flex>

                <Text whiteSpace="pre-wrap" lineHeight="1.5rem">
                  <Text as="span" fontWeight="500">
                    What i did:
                  </Text>{" "}
                  {exp.description}
                </Text>
              </Stack>
            ))}
          </Stack>
        ) : (
          <Text
            mt="-0.5rem"
            lineHeight="1.25rem"
            opacity="0.5"
            fontSize={{ base: "sm", sm: "md" }}
            letterSpacing="-0.8px"
          >
            {isEditable
              ? "Add your relevant experience"
              : "No experiences added"}
          </Text>
        )}
      </ProfileSection>
      <ExperienceDrawer
        isOpen={actionsProfileInfo.experienceOpen || false}
        onClose={() =>
          dispatch(
            actionsProfileInfoSlice.actions.toggleModal({
              experienceOpen: false,
            })
          )
        }
      />
    </>
  );
};

export default ExperienceSection;
