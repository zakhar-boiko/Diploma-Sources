import { useMutation } from "react-query";
import { ApiClient } from "../../../lib/api/client";
import { SignInRequestType, SignUpRequestType, TokenType } from "./types";
import { AxiosError } from "axios";

export const useSignInMutation = () => {
  return useMutation(({ email, password }: SignInRequestType) => {
    const basicAuth = btoa(`${email}:${password}`);
    return ApiClient.post<AxiosError, TokenType>("/auth/sign-in", null, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
      },
    });
  });
};

export const useSignUpMutation = () => {
  return useMutation(
    ({ email, password, ...authOptions }: SignUpRequestType) => {
      const basicAuth = btoa(`${email}:${password}`);
      return ApiClient.post<AxiosError, TokenType>(
        "/auth/sign-up",
        authOptions,
        {
          headers: {
            Authorization: `Basic ${basicAuth}`,
          },
        }
      );
    }
  );
};
