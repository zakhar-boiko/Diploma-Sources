import { FunctionComponent, ReactNode } from 'react';
import { HiOutlineCheck } from 'react-icons/hi2';

import {
  Box,
  Center,
  Flex,
  Input,
  UseCheckboxProps,
  useCheckbox,
} from '@chakra-ui/react';

interface RadioInputProps extends UseCheckboxProps {
    children: ReactNode;
}

const RadioInput: FunctionComponent<RadioInputProps> = (props) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box
      flexGrow={1}
      flexBasis={0}
      position="relative"
      as="label"
      margin="0 !important"
    >
      <Input {...input} />
      <Flex
        width={'100%'}
        alignItems="center"
        gap="0.75rem"
        cursor="pointer"
        fontSize="sm"
        lineHeight="normal"
        borderWidth="0.065rem"
        borderStyle="solid"
        borderColor="ui_elements_outlines_separators"
        borderRadius="0.25rem"
        padding="0.75rem"
        bg="white"
        whiteSpace="nowrap"
        transition="all 0.3s"
        color={props.isChecked ? 'ui_dark' : 'rgba(0,0,0,0.5)'}
        {...checkbox}
        _checked={{ borderColor: 'ui_dark' }}
      >
        <Center
          transition="all 0.3s"
          width="1rem"
          sx={{ aspectRatio: '1' }}
          border={
            props.isChecked
              ? '0.065rem solid black'
              : '0.065rem solid rgba(0,0,0,0.2)'
          }
          borderRadius="50%"
          bg={props.isChecked ? 'ui_dark' : 'ui_grey'}
        >
          {props.isChecked && <HiOutlineCheck color="white" size="0.75rem" />}
        </Center>
        {props.children}
      </Flex>
    </Box>
  );
};

export default RadioInput;
