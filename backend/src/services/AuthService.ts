import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignedTokenType } from "../types/UserTypes";

const checkPassword = async (password: string, encryptedPassword: string) => {
  const passwordMatch = await bcrypt.compare(password, encryptedPassword);
  return passwordMatch;
};

const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

  return (decoded as SignedTokenType)?.userId;
};

export { checkPassword, decodeToken };
