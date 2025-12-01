import { Flex, useRadioGroup } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { AccountType } from "../../../profile/api/enums/enums";
import { AccountTypeRadioButton } from "../AccountTypeRadioButton/AccountTypeRadioButton";

interface AccountTypeSwitchProps {
  type: AccountType;
  setAccountType: (type: AccountType) => void;
}

const optionsTypes = [
  { value: AccountType.CONSULTANT, label: "Candidate" },

  { value: AccountType.CLIENT, label: "Recruiter" },
];

const AccountTypeSwitch: FunctionComponent<AccountTypeSwitchProps> = ({
  setAccountType,
  type,
}) => {
  const { getRadioProps } = useRadioGroup({
    name: "accountType",
    defaultValue: type,
    onChange: (nextValue: AccountType) => setAccountType(nextValue),
  });

  return (
    <Flex
      flexDirection={{ base: "column", sm: "row" }}
      gap={{ base: "1.25rem", sm: "2rem" }}
    >
      {optionsTypes.map((option) => (
        <AccountTypeRadioButton
          key={option.value}
          {...getRadioProps({ value: option.value })}
        >
          {option.label}
        </AccountTypeRadioButton>
      ))}
    </Flex>
  );
};

export default AccountTypeSwitch;
