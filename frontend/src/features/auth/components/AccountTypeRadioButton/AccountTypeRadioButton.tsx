import { Box, Center, Flex, Input, useRadio } from "@chakra-ui/react";
import { HiOutlineCheck } from "react-icons/hi";

export const AccountTypeRadioButton = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box
      width="100%"
      flexGrow={1}
      flexBasis={0}
      position="relative"
      as="label"
      margin="0 !important"
    >
      <Input {...input} />
      <Flex
        width={"100%"}
        alignItems="center"
        justify="center"
        gap="1rem"
        cursor="pointer"
        color="black"
        fontSize={{ base: "1.125rem", sm: "xl" }}
        lineHeight="normal"
        border="0.065rem solid rgba(0,0,0,0.1)"
        borderRadius="0.25rem"
        py={{ base: "2.5rem", sm: "4.75rem" }}
        px="0.875rem"
        bg="ui_secondary"
        transition="all 0.3s"
        {...checkbox}
        _checked={{ color: "white", bg: "black" }}
      >
        <Center
          position="absolute"
          top="0.75rem"
          right="0.75rem"
          transition="all 0.3s"
          width="1.25rem"
          height="1.25rem"
          borderRadius="50%"
          color="black"
          bg={props.isChecked ? "white" : "#F0F0F0"}
        >
          {props.isChecked && <HiOutlineCheck size="1rem" />}
        </Center>
        {props.children}
      </Flex>
    </Box>
  );
};
