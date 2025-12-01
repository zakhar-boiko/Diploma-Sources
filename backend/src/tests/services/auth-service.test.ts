import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkPassword, decodeToken } from "../../services/AuthService";

jest.mock("jsonwebtoken");
jest.mock("bcrypt");
jest.mock("../../repositories/GigRepository");


describe("checkPassword", () => {
  test("returns true for matching passwords", async () => {
    const password = "12345678";
    const encryptedPassword =
      "$2b$10$HA9HOIXWaiO8tYTGwmlQ6uW.Nqrli3QpJ4bjtJS3lSo1E.5HvxnZa";

    (bcrypt.compare as jest.Mock).mockImplementationOnce(async () => true);

    const passwordMatch = await checkPassword(password, encryptedPassword);

    expect(passwordMatch).toBe(true);
  });

  test("returns false for non-matching passwords", async () => {
    const password = "12345678";
    const encryptedPassword =
      "$2b$10dHA9HOIXWaiO8tYTGsmlQ6uW.Nqrli3QpJ4ajtJS3lSo1E.53vxnZa";

    (bcrypt.compare as jest.Mock).mockImplementationOnce(async () => false);

    const passwordMatch = await checkPassword(password, encryptedPassword);

    expect(passwordMatch).toBe(false);
  });
});

describe("decodeToken", () => {
  test("returns userId from a valid token", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDY3ZmFmZC0zMWNiLTQ4YjAtYjZkZS1iNDZlNzU5ZWQ4YTciLCJpYXQiOjE3MTQ4MTIzMDV9.zfLi7X2gu7dubOd1AWwXCfpDdww7jDYWMI6REOYarko";

    (jwt.verify as jest.Mock).mockReturnValueOnce({
      userId: "2d67fafd-31cb-48b0-b6de-b46e759ed8a7",
    });

    const decodedUserId = decodeToken(token);

    expect(decodedUserId).toBe("2d67fafd-31cb-48b0-b6de-b46e759ed8a7");
  });

  test("returns null for an invalid token", () => {
    const token = "invalid-token";

    (jwt.verify as jest.Mock).mockImplementationOnce(() => {
      return undefined;
    });

    const decodedUserId = decodeToken(token);

    expect(decodedUserId).toBeUndefined();
  });
});
