import { FunctionComponent } from "react";
import ProfileSection from "../ProfileSection/ProfileSection";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ConsultantType } from "../../api/types";
import { HiOutlinePlus } from "react-icons/hi";
import { actionsProfileInfoSlice } from "../../../../state/ActionsProfileInfoState";
import { useDispatch } from "react-redux";
import { AccountType } from "../../api/enums/enums";
import SkillsDrawer from "../SkillsDrawer/SkillsDrawer";
import { useAppSelector } from "../../../../store/hooks";

interface SkillsSectionProps {
  profile: ConsultantType;
  isEditable?: boolean;
}

const SkillsSection: FunctionComponent<SkillsSectionProps> = ({
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
                    skillsOpen: true,
                  })
                )
              }
              iconSpacing="0"
            >
              {"Add"}
            </Button>
          ) : undefined
        }
        title="Skills"
        hasBorder={true}
      >
        {profile.skills?.length ? (
          <Flex mt="0 !important" flexWrap="wrap" gap="0.5rem">
            {profile.skills.map((skill) => {
              return (
                <Box
                  cursor="default"
                  padding="0.5rem"
                  textTransform="uppercase"
                  letterSpacing="-0.7px"
                  fontSize="sm"
                  background="ui_main"
                  borderWidth="0.065rem"
                  borderStyle="solid"
                  borderColor="ui_elements_outlines_separators"
                  borderRadius="0.25rem"
                  transition="all 0.3s"
                  whiteSpace="nowrap"
                >
                  {skill.name}
                </Box>
              );
            })}
          </Flex>
        ) : (
          <Text
            mt="-0.5rem"
            lineHeight="1.25rem"
            opacity="0.5"
            fontSize={{ base: "sm", sm: "md" }}
            letterSpacing="-0.8px"
          >
            {isEditable ? "Add your relevant skills" : "No skills added"}
          </Text>
        )}
      </ProfileSection>
      <SkillsDrawer
        isOpen={actionsProfileInfo.skillsOpen || false}
        onClose={() =>
          dispatch(
            actionsProfileInfoSlice.actions.toggleModal({
              skillsOpen: false,
            })
          )
        }
      />
    </>
  );
};

export default SkillsSection;
