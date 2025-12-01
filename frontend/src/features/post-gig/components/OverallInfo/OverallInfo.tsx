import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from "react";

import { Box, Flex, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { GigDataType } from "../../../gigs/api/types";
import GigParameterSection from "../GigParameterSection/GigParameterSection";
import TextInput from "../../../../components/TextInput/TextInput";
import { ProfileLevel } from "../../../profile/api/enums/enums";
import RadioInput from "../../../../components/RadioInput/RadioInput";
import { PROFILE_LEVEL_VALUES_MAP } from "../../../../constants";

interface OverallInfoProps {
  gigData: GigDataType;
  setGigData: Dispatch<SetStateAction<GigDataType>>;
}

const OverallInfo: FunctionComponent<OverallInfoProps> = ({
  gigData,
  setGigData,
}) => {
  return (
    <Stack gap="2.5rem">
      <Stack gap="1.5rem" width="100%">
        <GigParameterSection
          title="Title"
          description={`Add title for this gig.`}
        >
          <TextInput
            name="role"
            onChange={(value: string) =>
              setGigData((prevGigData) => ({
                ...prevGigData,
                title: value,
              }))
            }
            value={gigData.title}
            placeholder="Type here..."
          />
        </GigParameterSection>

        <GigParameterSection
          title="Level of experience"
          description="What level of experience will it need?"
        >
          <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} gap="0.75rem">
            {Object.entries(ProfileLevel).map(([key, value]) => {
              return (
                <RadioInput
                  isChecked={gigData.profileLevel == key}
                  value={key}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setGigData((prevGigData) => ({
                      ...prevGigData,
                      profileLevel: event.target.value as ProfileLevel,
                    }))
                  }
                >
                  {PROFILE_LEVEL_VALUES_MAP[key]}
                </RadioInput>
              );
            })}
          </SimpleGrid>
        </GigParameterSection>
      </Stack>
    </Stack>
  );
};

export default OverallInfo;
