import { FunctionComponent } from "react";
import { ClientType } from "../../api/types";
import ProfileSection from "../ProfileSection/ProfileSection";
import { Button, Text } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { actionsProfileInfoSlice } from "../../../../state/ActionsProfileInfoState";
import CompanyInfoDrawer from "../CompanyInfoDrawer/CompanyInfoDrawer";
import { useAppSelector } from "../../../../store/hooks";

interface ProfileCompanyInfoSectionsProps {
  profile: ClientType;
  isEditable: boolean;
}

const companyFields = [
  {
    key: "company",
    title: "Company",
  },

  {
    key: "businessArea",
    title: "Business area",
  },
  {
    key: "numberOfEmployees",
    title: "Number of employees",
  },
];

const ProfileCompanyInfoSections: FunctionComponent<
  ProfileCompanyInfoSectionsProps
> = ({ profile, isEditable }) => {
  const dispatch = useDispatch();

  const { actionsProfileInfo } = useAppSelector((state) => state.main);

  return (
    <>
      {companyFields.map((field) => {
        return (
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
                    !profile[field.key as keyof ClientType] ? (
                      <HiOutlinePlus size="1rem" />
                    ) : undefined
                  }
                  onClick={() =>
                    dispatch(
                      actionsProfileInfoSlice.actions.toggleModal({
                        companyInfoOpen: true,
                      })
                    )
                  }
                  iconSpacing="0"
                >
                  {!profile[field.key as keyof ClientType] ? "Add" : "Edit"}
                </Button>
              ) : undefined
            }
            title={field.title}
          >
            {profile[field.key as keyof ClientType] ? (
              <Text
                fontSize={{ base: "sm", sm: "md" }}
                lineHeight="1.5rem"
                letterSpacing="-0.8px"
                whiteSpace="pre-wrap"
              >
                {profile[field.key as keyof ClientType]}
              </Text>
            ) : (
              <Text
                mt="-0.5rem"
                lineHeight="1.25rem"
                opacity="0.5"
                fontSize={{ base: "sm", sm: "md" }}
                letterSpacing="-0.8px"
              >
                Add {field.title.toLowerCase()}
              </Text>
            )}
          </ProfileSection>
        );
      })}

      <CompanyInfoDrawer
        isOpen={actionsProfileInfo.companyInfoOpen || false}
        onClose={() =>
          dispatch(
            actionsProfileInfoSlice.actions.toggleModal({
              companyInfoOpen: false,
            })
          )
        }
      />
    </>
  );
};

export default ProfileCompanyInfoSections;
