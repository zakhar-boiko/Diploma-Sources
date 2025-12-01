import { FunctionComponent, useMemo } from 'react';

import { Button, StyleProps, Text } from '@chakra-ui/react';

interface ToggleItemProps {
  toggle: (item: string) => void;
  item: string;
  isSelected: boolean;
  labelsEnum?: any;
  variant?: "REGULAR" | "TRANSPARENT"
  style?: StyleProps
}

const ToggleItem: FunctionComponent<ToggleItemProps> = ({
  item,
  toggle,
  isSelected,
  labelsEnum,
  variant = "REGULAR",
  style
}) => {
  const btnStyles = useMemo(
    () =>
      isSelected
        ? {
            color: 'ui_light',
            bgColor: 'ui_dark',
            borderWidth: '0.065rem',
            borderStyle: 'solid',
            borderColor: 'ui_dark',
            background: 'ui_main',
            _hover: {
              textColor: 'ui_light',
              bgColor: 'ui_dark',
            },
          }
        : {
            bg: 'transparent',
            borderStyle: 'solid',
            borderWidth: '0.065rem',
            borderColor: variant == 'REGULAR' ? 'ui_main': "ui_dark",
            background: 'ui_main',
            color: 'ui_dark',
            _hover: {
              bgColor: 'ui_dark',
              color: 'ui_light',
              borderColor: 'ui_dark',
            },
          },
    [isSelected]
  );

  return (
    <Button
      _disabled={{
        cursor: 'default',
      }}
      onClick={() => toggle(item)}
      borderRadius="0.25rem"
      padding="0.5rem"
      rounded="0.25rem"
      textTransform="uppercase"
      fontWeight="400"
      whiteSpace="nowrap"
      letterSpacing='-0.7px'
      {...btnStyles}
      {...style}
    >
      <Text casing="uppercase">
        {labelsEnum ? labelsEnum[item as keyof typeof labelsEnum] : item}
      </Text>
    </Button>
  );
};

export default ToggleItem;
