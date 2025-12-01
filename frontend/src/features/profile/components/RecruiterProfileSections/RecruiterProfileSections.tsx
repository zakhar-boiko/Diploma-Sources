import { Stack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import ProfileDescriptionSection from "../ProfileDescriptionSection/ProfileDescriptionSection";
import { useFetchProfile } from "../../api/client";
import { ClientType } from "../../api/types";
import ProfileCompanyInfoSections from "../ProfileCompanyInfoSections/ProfileCompanyInfoSections";

interface RecruiterProfileSectionsProps {
  profile: ClientType;
  isEditable?: boolean;
}

const RecruiterProfileSections: FunctionComponent<
  RecruiterProfileSectionsProps
> = ({ profile, isEditable=true }) => {
  return (
    <Stack gap={{ base: "1.5rem", sm: "2.5rem" }}>
      <ProfileDescriptionSection isEditable={isEditable} profile={profile} />
      <ProfileCompanyInfoSections isEditable={isEditable} profile={profile}/>
    </Stack>
  );
};

export default RecruiterProfileSections;
