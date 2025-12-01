import { FunctionComponent } from "react";
import { ConsultantType } from "../../api/types";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store/hooks";
import ProfileSection from "../ProfileSection/ProfileSection";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { actionsProfileInfoSlice } from "../../../../state/ActionsProfileInfoState";
import LanguagesDrawer from "../LanguagesDrawer/LanguagesDrawer";

interface LanguagesSectionProps {
  profile: ConsultantType;
  isEditable?: boolean;
}

const LanguagesSection: FunctionComponent<LanguagesSectionProps> = ({
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
                    languagesOpen: true,
                  })
                )
              }
              iconSpacing="0"
            >
              {"Add"}
            </Button>
          ) : undefined
        }
        title="Languages"
        hasBorder={true}
      >
        {profile.languages?.length ? (
          <Flex mt="0 !important" flexWrap="wrap" gap="0.5rem">
            {profile.languages.map((language) => {
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
                  {language.name}
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
            {isEditable ? "Add your languages" : "No languages added"}
          </Text>
        )}
      </ProfileSection>
      <LanguagesDrawer
        isOpen={actionsProfileInfo.languagesOpen || false}
        onClose={() =>
          dispatch(
            actionsProfileInfoSlice.actions.toggleModal({
              languagesOpen: false,
            })
          )
        }
      />
    </>
  );
};

export default LanguagesSection;
