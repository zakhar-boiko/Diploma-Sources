import { FunctionComponent } from "react";

import { Flex, Stack } from "@chakra-ui/react";
import GigParameterSection from "../GigParameterSection/GigParameterSection";
import SearchableSelect from "../../../../components/SearchableSelect/SearchableSelect";

import React from "react";
import {
  useFetchAvailableLanguages,
  useFetchAvailableSkills,
} from "../../../profile/api/client";
interface SkillsInfoSectionProps {
  skills: string[];
  setSkills: (skill: string[]) => void;
  languages: string[];
  setLanguages: (language: string[]) => void;
}

const SkillsInfoSection: FunctionComponent<SkillsInfoSectionProps> = ({
  setSkills,
  skills,
  languages,
  setLanguages,
}) => {
  const { data: availableSkills } = useFetchAvailableSkills();
  const { data: availableLanguages } = useFetchAvailableLanguages();

  return (
    <Stack gap="1.5rem">
      <GigParameterSection
        title="Skills"
        description={`Select the main skills required for your position.`}
      >
        <SearchableSelect
          options={
            availableSkills?.map((skill) => {
              return {
                value: skill.id,
                label: skill.name,
              };
            }) ?? []
          }
          onChange={(value: string) =>
            setSkills(
              skills.includes(value)
                ? skills.filter((skill) => skill !== value)
                : [...skills, value]
            )
          }
          labelsEnum={availableSkills?.reduce((skillsMap, skill) => {
            return {
              ...skillsMap,
              [skill.id as string]: skill.name,
            };
          }, {})}
          placeHolder="Search for a skill"
          value={skills}
        />
      </GigParameterSection>
      <GigParameterSection title="Languages" description="Select languages.">
        <SearchableSelect
          options={
            availableLanguages?.map((skill) => {
              return {
                value: skill.id,
                label: skill.name,
              };
            }) ?? []
          }
          onChange={(value: string) =>
            setLanguages(
              languages.includes(value)
                ? languages.filter((skill) => skill !== value)
                : [...languages, value]
            )
          }
          labelsEnum={availableLanguages?.reduce((languagesMap, language) => {
            return {
              ...languagesMap,
              [language.id as string]: language.name,
            };
          }, {})}
          placeHolder="Search for a language"
          value={languages}
        />{" "}
      </GigParameterSection>
    </Stack>
  );
};

export default SkillsInfoSection;
