import { FunctionComponent } from "react";
import { useFetchUser } from "../../features/user/api/client";
import { useParams } from "react-router-dom";
import { Stack } from "@chakra-ui/react";
import ConsultantProfileSections from "../../features/profile/components/ConsultantProfileSections/ConsultantProfileSections";
import { profile } from "console";
import { AccountType } from "../../features/profile/api/enums/enums";
import RecruiterProfileSections from "../../features/profile/components/RecruiterProfileSections/RecruiterProfileSections";
import UserGeneralInfoSection from "../../features/user/components/UserGeneralInfoSection/UserGeneralInfoSection";

interface UserProfilePageProps {}

const UserProfilePage: FunctionComponent<UserProfilePageProps> = () => {
  const { id } = useParams();

  const { data: user } = useFetchUser(id ?? "");

  return (
    <Stack
      alignSelf="center"
      width="100%"
      maxW={1264}
      gap={{ base: "2rem", sm: "3rem", "2xl": "3.75rem" }}
    >
      {user && (
        <>
          <UserGeneralInfoSection user={user} />

          {user?.accountType == "CONSULTANT" ? (
            <ConsultantProfileSections isEditable={false} profile={user} />
          ) : (
            "company" in user && (
              <RecruiterProfileSections isEditable={false} profile={user} />
            )
          )}
        </>
      )}
    </Stack>
  );
};

export default UserProfilePage;
