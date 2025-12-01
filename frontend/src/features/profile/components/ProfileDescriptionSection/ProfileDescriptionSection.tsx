import { FunctionComponent } from "react";
import ProfileSection from "../ProfileSection/ProfileSection";
import { Button, Text } from "@chakra-ui/react";
import { ConsultantType } from "../../api/types";
import { useDispatch } from "react-redux";
import { actionsProfileInfoSlice } from "../../../../state/ActionsProfileInfoState";
import { HiOutlinePlus } from "react-icons/hi";
import { AccountType } from "../../api/enums/enums";
import DescriptionDrawer from "../DescriptionDrawer/DescriptionDrawer";
import { useAppSelector } from "../../../../store/hooks";

interface ProfileDescriptionSectionProps {
  profile: ConsultantType;
  isEditable?: boolean;
}

const ProfileDescriptionSection: FunctionComponent<
  ProfileDescriptionSectionProps
> = ({ profile, isEditable }) => {
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
              leftIcon={
                !profile.description ? <HiOutlinePlus size="1rem" /> : undefined
              }
              onClick={() =>
                dispatch(
                  actionsProfileInfoSlice.actions.toggleModal({
                    aboutOpen: true,
                  })
                )
              }
              iconSpacing="0"
            >
              {!profile.description ? "Add" : "Edit"}
            </Button>
          ) : undefined
        }
        title={`About ${
          profile.accountType == AccountType.CONSULTANT ? "me" : "us"
        }`}
        hasBorder={true}
      >
        {profile.description ? (
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            lineHeight="1.5rem"
            letterSpacing="-0.8px"
            whiteSpace="pre-wrap"
          >
            {profile.description}
          </Text>
        ) : isEditable ? (
          <Text
            mt="-0.5rem"
            lineHeight="1.25rem"
            opacity="0.5"
            fontSize={{ base: "sm", sm: "md" }}
            letterSpacing="-0.8px"
          >
            Add a short description about{" "}
            {profile.accountType == AccountType.CONSULTANT
              ? "yourself"
              : "your company"}{" "}
            here
          </Text>
        ) : (
          <Text
            mt="-0.5rem"
            lineHeight="1.25rem"
            opacity="0.5"
            fontSize={{ base: "sm", sm: "md" }}
            letterSpacing="-0.8px"
          >
            No description added
          </Text>
        )}
      </ProfileSection>
      <DescriptionDrawer
        isOpen={actionsProfileInfo.aboutOpen || false}
        onClose={() =>
          dispatch(
            actionsProfileInfoSlice.actions.toggleModal({
              aboutOpen: false,
            })
          )
        }
      />
    </>
  );
};

export default ProfileDescriptionSection;
