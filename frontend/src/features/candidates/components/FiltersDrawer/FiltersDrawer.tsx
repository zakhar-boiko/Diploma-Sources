import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import DrawerBase from "../../../../components/DrawerBase/DrawerBase";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { FilterOptions } from "../../api/types";
import { DEFAULT_FILTER_OPTIONS } from "../../constants";
import {
  useFetchAvailableLanguages,
  useFetchAvailableSkills,
} from "../../../profile/api/client";
import SearchableSelect from "../../../../components/SearchableSelect/SearchableSelect";
import ToggleItem from "../../../../components/ToggleItem/ToggleItem";
import { ProfileLevel } from "../../../profile/api/enums/enums";

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  setFilterOptions: Dispatch<SetStateAction<FilterOptions>>;
  isFilterApplied: boolean;
}

const FiltersDrawer: FunctionComponent<FiltersDrawerProps> = ({
  isOpen,
  onClose,
  setFilterOptions,
  isFilterApplied,
}) => {
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>(
    DEFAULT_FILTER_OPTIONS
  );

  const { data: availableSkills } = useFetchAvailableSkills();
  const { data: availableLanguages } = useFetchAvailableLanguages();

  const numberOfAppliedFilters = useMemo(() => {
    return (
      appliedFilters.skills.length +
      appliedFilters.languages.length +
      appliedFilters.profileLevel.length
    );
  }, [appliedFilters]);

  const onSubmit = () => {
    setFilterOptions(appliedFilters);
    onClose();
  };

  const clearFilters = () => {
    setAppliedFilters(DEFAULT_FILTER_OPTIONS);
    setFilterOptions(DEFAULT_FILTER_OPTIONS);
  };

  return (
    <DrawerBase
      footer={
        numberOfAppliedFilters > 0 ? (
          <Button
            height="fit-content"
            py={{ base: "1rem", sm: "2rem" }}
            _hover={{ backgroundColor: "ui_accents_main", color: "ui_dark" }}
            color="ui_light"
            bg="ui_dark"
            width="100%"
            onClick={onSubmit}
          >
            Apply filters ({numberOfAppliedFilters})
          </Button>
        ) : undefined
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <Stack gap="2rem">
        <Flex
          mb="2rem"
          gap="2rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text
            fontWeight="500"
            fontSize={{ base: "xl", sm: "2.25rem" }}
            padding="0"
            lineHeight="normal"
            fontFamily="heading"
          >
            Filters
          </Text>

          {isFilterApplied && (
            <Button
              variant="unstyled"
              textTransform="uppercase"
              border="0.065rem solid black"
              rounded="3rem"
              py="0.5rem"
              px="1.25rem !important"
              letterSpacing="-0.8px"
              transition="all 0.3s"
              _hover={{
                color: "ui_light",
                bg: "ui_dark",
              }}
              onClick={clearFilters}
            >
              Clear filters
            </Button>
          )}
        </Flex>
        <Stack gap="2.5rem">
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
              setAppliedFilters((prevAppliedFilters) => ({
                ...prevAppliedFilters,
                skills: !prevAppliedFilters.skills.includes(value)
                  ? [...prevAppliedFilters.skills, value]
                  : prevAppliedFilters.skills.filter(
                      (skill) => skill !== value
                    ),
              }))
            }
            name="Skills"
            labelsEnum={availableSkills?.reduce((skillsMap, skill) => {
              return {
                ...skillsMap,
                [skill.id as string]: skill.name,
              };
            }, {})}
            placeHolder="Search for a skill"
            value={appliedFilters.skills}
          />
          <SearchableSelect
            name="Languages"
            options={
              availableLanguages?.map((skill) => {
                return {
                  value: skill.id,
                  label: skill.name,
                };
              }) ?? []
            }
            onChange={(value: string) =>
              setAppliedFilters((prevAppliedFilters) => ({
                ...prevAppliedFilters,
                languages: !prevAppliedFilters.languages.includes(value)
                  ? [...prevAppliedFilters.languages, value]
                  : prevAppliedFilters.languages.filter(
                      (language) => language !== value
                    ),
              }))
            }
            labelsEnum={availableLanguages?.reduce((languagesMap, language) => {
              return {
                ...languagesMap,
                [language.id as string]: language.name,
              };
            }, {})}
            placeHolder="Search for a language"
            value={appliedFilters.languages}
          />

          <Stack mt="0 !important" gap="0.75rem">
            <Text
              textTransform="uppercase"
              fontWeight="500"
              letterSpacing="-0.8px"
              lineHeight="normal"
            >
              Profile level
            </Text>
            <Flex gap="0.5rem" flexWrap="wrap">
              {Object.entries(ProfileLevel).map(([key, value]) => {
                return (
                  <ToggleItem
                    item={key}
                    labelsEnum={ProfileLevel}
                    isSelected={appliedFilters.profileLevel.includes(key)}
                    toggle={(value: string) =>
                      setAppliedFilters((prevAppliedFilters) => ({
                        ...prevAppliedFilters,
                        profileLevel: !prevAppliedFilters.profileLevel.includes(
                          value
                        )
                          ? [...prevAppliedFilters.profileLevel, value]
                          : prevAppliedFilters.profileLevel.filter(
                              (profileLevel) => profileLevel !== value
                            ),
                      }))
                    }
                  />
                );
              })}
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </DrawerBase>
  );
};

export default FiltersDrawer;
