import { FunctionComponent } from "react";
import { HiChevronDown } from "react-icons/hi2";

import { Button } from "@chakra-ui/react";

interface ShowMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const ShowMoreButton: FunctionComponent<ShowMoreButtonProps> = ({
  onClick,
  isLoading,
  disabled,
}) => {
  return (
    <Button
      mt="0 !important"
      variant="link"
      color="ui_dark"
      rightIcon={<HiChevronDown size="1.5rem" />}
      _hover={{
        gap: "1rem",
      }}
      gap="0.75rem"
      iconSpacing="0"
      transition="all 0.3s"
      onClick={onClick}
      isLoading={isLoading}
      disabled={disabled}
    >
      Show more
    </Button>
  );
};

export default ShowMoreButton;
