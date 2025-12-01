import { AccountType, ProfileLevel } from "../../profile/api/enums/enums";

export type SignInRequestType = {
  email: string;
  password: string;
};

export type TokenType = {
  token: string;
};

export type SignUpRequestType = {
  email: string;
  password: string;
  firstName: string;
  title: string;
  accountType: AccountType;
  lastName: string;
};
