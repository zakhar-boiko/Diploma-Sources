import {
  Button,
  Center,
  Flex,
  Stack,
  TabPanel,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { SignUpRequestType, TokenType } from "../../features/auth/api/types";
import { AccountType } from "../../features/profile/api/enums/enums";
import { useSignUpMutation } from "../../features/auth/api/client";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils";
import TextInput from "../../components/TextInput/TextInput";
import { Link } from "../../components/Link/Link";
import AccountTypeSwitch from "../../features/auth/components/AccountTypeSwitch/AccountTypeSwitch";

interface SignUpPageProps {}

const SignUpPage: FunctionComponent<SignUpPageProps> = () => {
  const [tab, setTab] = useState<number>(0);

  const [formData, setFormData] = useState<SignUpRequestType>({
    email: "",
    password: "",
    accountType: AccountType.CONSULTANT,
    firstName: "",
    title: "",
    lastName: "",
  });

  const { mutate: signIn, isLoading } = useSignUpMutation();

  const navigate = useNavigate();

  const toast = useToast();

  const onSubmit = () => {
    if (validateEmail(formData.email) && formData.password.length < 20) {
      signIn(formData, {
        onSuccess: (data: TokenType) => {
          localStorage.setItem("authToken", data.token);
          navigate("/profile");
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
    <Center py="2rem" height="100%" flexGrow={1}>
      {tab == 0 ? (
        <Stack gap={{ base: "1.5rem", sm: "2.5rem" }} width="100%" maxW={1208}>
          <Text
            fontWeight="500"
            lineHeight="normal"
            fontSize="3rem"
            fontFamily="heading"
          >
            You are a...
          </Text>
          <AccountTypeSwitch
            type={formData.accountType}
            setAccountType={(type: AccountType) =>
              setFormData((prevData) => ({
                ...prevData,
                accountType: type,
              }))
            }
          />
          <Button
            onClick={() => setTab((prevTab) => prevTab + 1)}
            width={{ base: "100%", sm: "16.25rem" }}
            py="0.875rem"
            variant="regular"
          >
            Continue
          </Button>
        </Stack>
      ) : (
        <Stack
          gap={{ base: "1.5rem", sm: "2rem" }}
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
              Create an account
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
                name="title"
                value={formData.title}
                onChange={(value: string) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    title: value,
                  }));
                }}
                placeholder="Enter title"
              />
              <Flex gap="1rem">
                <TextInput
                  name="firstName"
                  value={formData.firstName}
                  onChange={(value: string) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      firstName: value,
                    }));
                  }}
                  placeholder="Enter first name"
                />
                <TextInput
                  name="lastName"
                  value={formData.lastName}
                  onChange={(value: string) => {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      lastName: value,
                    }));
                  }}
                  placeholder="Enter last name"
                />
              </Flex>

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
            isDisabled={
              !formData.email.length ||
              !formData.password.length ||
              !formData.firstName.length ||
              !formData.title.length ||
              !formData.lastName.length
            }
            isLoading={isLoading}
            onClick={onSubmit}
            width={{ base: "100%", sm: "16.25rem" }}
            py="0.875rem"
            variant="regular"
          >
            Register
          </Button>
          <Link
            href="/auth/sign-in"
            textTransform="uppercase"
            textDecor="underline"
            fontWeight="500"
            letterSpacing="-0.8px"
          >
            Already have an account? Log in
          </Link>
        </Stack>
      )}
    </Center>
  );
};

export default SignUpPage;
