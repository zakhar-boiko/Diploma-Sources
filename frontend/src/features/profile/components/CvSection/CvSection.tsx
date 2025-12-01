import { FunctionComponent } from "react";
import ProfileSection from "../ProfileSection/ProfileSection";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "../../../../components/Link/Link";
import { ConsultantType } from "../../api/types";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { HiOutlinePlus } from "react-icons/hi";
import { actionsProfileInfoSlice } from "../../../../state/ActionsProfileInfoState";
import CvDrawer from "../CvDrawer/CvDrawer";
import { useAppSelector } from "../../../../store/hooks";

interface CvSectionProps {
  profile: ConsultantType;
  isEditable?: boolean;
}

const CvSection: FunctionComponent<CvSectionProps> = ({
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
                    uploadCVOpen: true,
                  })
                )
              }
              iconSpacing="0"
            >
              {"Add"}
            </Button>
          ) : undefined
        }
        title={"Cv"}
        hasBorder={true}
      >
        {profile.cvUrl ? (
          <Link
            href={profile.cvUrl}
            target="_blank"
            letterSpacing="-0.8px"
            lineHeight="1.25rem"
            textTransform="uppercase"
            fontWeight="500"
          >
            <Flex alignItems="center" gap="0.75rem">
              <HiOutlineArrowDownTray size="1.5rem" />
              Download CV/Resume
            </Flex>
          </Link>
        ) : (
          <Text
            mt="-0.5rem"
            lineHeight="1.25rem"
            opacity="0.5"
            fontSize={{ base: "sm", sm: "md" }}
            letterSpacing="-0.8px"
          >
            {isEditable ? "Upload your CV" : "No Cv added"}
          </Text>
        )}
      </ProfileSection>
      <CvDrawer
        isOpen={actionsProfileInfo.uploadCVOpen || false}
        onClose={() =>
          dispatch(
            actionsProfileInfoSlice.actions.toggleModal({
              uploadCVOpen: false,
            })
          )
        }
      />
    </>
  );
};

export default CvSection;
