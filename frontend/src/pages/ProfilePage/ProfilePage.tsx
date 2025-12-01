import { Stack, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import ProfileGeneralInfo from "../../features/profile/components/ProfileGeneralInfo/ProfileGeneralInfo";
import { useFetchProfile } from "../../features/profile/api/client";
import ConsultantProfileSections from "../../features/profile/components/ConsultantProfileSections/ConsultantProfileSections";
import RecruiterProfileSections from "../../features/profile/components/RecruiterProfileSections/RecruiterProfileSections";

interface ProfilePageProps {}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const { data: profile, refetch, isLoading } = useFetchProfile();
  return (
    <Stack
      alignSelf="center"
      width="100%"
      maxW={1264}
      gap={{ base: "2rem", sm: "3rem", "2xl": "3.75rem" }}
    >
      <ProfileGeneralInfo refetch={refetch} profile={profile} />
      {profile && (
        <>
          {profile?.accountType == "CONSULTANT" ? (
            <ConsultantProfileSections profile={profile} />
          ) : (
            "company" in profile && (
              <RecruiterProfileSections profile={profile} />
            )
          )}
        </>
      )}
    </Stack>
  );
};

export default ProfilePage;
