import { FocusEvent, FunctionComponent } from 'react';

import {
  InputGroup,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/react';

interface NumberInputProps {
  value: number | null;
  setValue: (value: number) => void;
  align?: 'left' | 'right';
  name?: string;
}

const NumberInputEditable: FunctionComponent<NumberInputProps> = ({
  setValue,
  value,
  name,
  align = 'left',
}) => {
  const moveCursorToEnd = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.target;

    if (input.value.length < 3) {
      input.setSelectionRange(2, 2);
    }
  };

  return (
    <NumberInput
      w="100%"
      mt="0 !important"
      onChange={(valueAsString: string, valueAsNumber: number) => {
        setValue(isNaN(valueAsNumber) ? 0 : valueAsNumber);
      }}
      min={0}
      focusBorderColor='transparent'
      value={value ?? ''}
    >
      <InputGroup
        bg="ui_main"
        display="flex"
        _focus={{
          borderColor: 'ui_elements_outlines_separators',
        }}
        borderWidth="0.065rem"
        borderStyle="solid"
        borderColor="transparent"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
        px="1rem"
        borderRadius="0.25rem"
      >
        {name && (
          <Text
            fontWeight="500"
            cursor="default"
            letterSpacing="-0.7px"
            left="1.25rem"
            fontSize="sm"
            lineHeight="normal"
            textTransform="uppercase"
            opacity="0.5"
          >
            {name}
          </Text>
        )}
        <NumberInputField
          _focus={{}}
          height="fit-content"
          borderRadius="0.25rem"
          border="none"
          textAlign={align}
          py="1.125rem"
          opacity="0.5"
          placeholder="0"
          _placeholder={{
            color: 'ui_dark',
          }}
          onFocus={moveCursorToEnd}
        />
      </InputGroup>
    </NumberInput>
  );
};

export default NumberInputEditable;
