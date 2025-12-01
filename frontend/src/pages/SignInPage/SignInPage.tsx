import { Button, Center, Stack, Text, useToast } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import { SignInRequestType, TokenType } from "../../features/auth/api/types";
import { validateEmail } from "../../utils";
import { useSignInMutation } from "../../features/auth/api/client";
import { useNavigate } from "react-router-dom";
import { Link } from "../../components/Link/Link";

interface SignInPageProps {}

const SignInPage: FunctionComponent<SignInPageProps> = () => {
  const [formData, setFormData] = useState<SignInRequestType>({
    email: "",
    password: "",
  });

  const { mutate: signIn, isLoading } = useSignInMutation();

  const navigate = useNavigate();

  const toast = useToast();

  const onSubmit = () => {
    if (validateEmail(formData.email) && formData.password.length < 20) {
      signIn(formData, {
        onSuccess: (data: TokenType) => {
          localStorage.setItem("authToken", data.token);
          navigate("/");
        },
        onError: (error) => {
          toast({
            status: "error",
            title: "Invalid email address or password",
            duration: 3000,
            isClosable: true,
          });
        },
      });
    } else {
      toast({
        status: "error",
        title: "Invalid email address or password",
        description:
          "Email address should match the format and the password lenghth should not exceed 20 symbols",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center height="100%" flexGrow={1}>
      <Stack
        gap={{ base: "1.5rem", sm: "2.5rem", "2xl": "3.75rem" }}
        height="100%"
        width="100%"
        maxW={784}
      >
        <Stack gap="1rem">
          <Text
            fontWeight="500"
            lineHeight="normal"
            fontSize="3rem"
            fontFamily="heading"
          >
            Welcome to Match-me
          </Text>
          <Text lineHeight="normal" mt="0 !Important">
            Login to your account
          </Text>
        </Stack>
        <Stack width="100%" gap="3rem">
          <Stack gap="1.5rem" width="100%">
            <TextInput
              name="email"
              value={formData.email}
              onChange={(value: string) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  email: value,
                }));
              }}
              placeholder="Enter email"
            />
            <TextInput
              name="password"
              isHiddable={true}
              value={formData.password}
              onChange={(value: string) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  password: value,
                }));
              }}
              placeholder="Enter password"
            />
          </Stack>
        </Stack>
        <Button
          isDisabled={!formData.email.length || !formData.password.length}
          isLoading={isLoading}
          onClick={onSubmit}
          width={{ base: "100%", sm: "16.25rem" }}
          py="0.875rem"
          variant="regular"
        >
          Login
        </Button>
        <Link
          href="/auth/sign-up"
          textTransform="uppercase"
          textDecor="underline"
          fontWeight="500"
          letterSpacing='-0.8px'
        >
          Do not have an account? register
        </Link>
      </Stack>
    </Center>
  );
};

export default SignInPage;
