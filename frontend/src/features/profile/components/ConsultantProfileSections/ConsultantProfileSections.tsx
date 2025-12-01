import { Stack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import ProfileDescriptionSection from "../ProfileDescriptionSection/ProfileDescriptionSection";
import { ConsultantType } from "../../api/types";
import SkillsSection from "../SkillsSection/SkillsSection";
import LanguagesSection from "../LanguagesSection/LanguagesSection";
import ExperienceSection from "../ExperienceSection/ExperienceSection";
import CvSection from "../CvSection/CvSection";

interface ConsultantProfileSectionsProps {
  profile: ConsultantType;
  isEditable?: boolean;
}

const ConsultantProfileSections: FunctionComponent<
  ConsultantProfileSectionsProps
> = ({ profile, isEditable = true }) => {
  return (
    <Stack gap={{ base: "1.5rem", sm: "2.5rem" }}>
      <ProfileDescriptionSection isEditable={isEditable} profile={profile} />
      <SkillsSection isEditable={isEditable} profile={profile} />
      <LanguagesSection isEditable={isEditable} profile={profile} />
      <ExperienceSection isEditable={isEditable} profile={profile} />
      <CvSection isEditable={isEditable} profile={profile} />
    </Stack>
  );
};

export default ConsultantProfileSections;
