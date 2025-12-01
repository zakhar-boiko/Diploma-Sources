import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Response } from "express-serve-static-core";
import { createUser, findByEmail } from "../../repositories/UserRepository";
import { checkPassword } from "../../services/AuthService";
import { signIn, signUp } from "../../controllers/AuthController";

jest.mock("jsonwebtoken");
jest.mock("bcrypt");
jest.mock("../../services/AuthService");
jest.mock("../../repositories/UserRepository");

describe("AuthController", () => {
  let req: any;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {},
    };
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    sendMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
      send: sendMock,
    };
  });

  describe("signIn", () => {
    test("returns 400 if email or password are missing", async () => {
      req.body = {};

      await signIn(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith("Email and password required");
    });

    test("returns 404 if user is not found", async () => {
      req.body = { email: "zaharbojko@gmail.com", password: "12345678" };
      (findByEmail as jest.Mock).mockResolvedValue(null);

      await signIn(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "User with email zaharbojko@gmail.com not found",
      });
    });

    test("returns 401 if password is incorrect", async () => {
      req.body = { email: "zaharbojko@gmail.com", password: "123456" };
      const user = {
        id: "11577cb6-1187-4931-b780-893066106634",
        password:
          "$2b$10$EtezwJOsYtbV8aVsUlwWJ.0wLcAuN39Oe0KpK0p1iSr1m.27KuypW",
      };
      (findByEmail as jest.Mock).mockResolvedValue(user);
      (checkPassword as jest.Mock).mockResolvedValue(false);

      await signIn(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Wrong password" });
    });

    test("returns 200 and a token if login is successful", async () => {
      req.body = { email: "zaharbojko@gmail.com", password: "12345678" };
      const user = {
        id: "11577cb6-1187-4931-b780-893066106634",
        password:
          "$2b$10$EtezwJOsYtbV8aVsUlwWJ.0wLcAuN39Oe0KpK0p1iSr1m.27KuypW",
      };
      (findByEmail as jest.Mock).mockResolvedValue(user);
      (checkPassword as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("token");

      await signIn(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({ status: "ok", token: "token" });
    });

    test("return 500s if an error occurs", async () => {
      req.body = { email: "zaharbojko@gmail.com", password: "12345678" };
      const error = new Error("Error");
      (findByEmail as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await signIn(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith({ error: "Login failed" });
    });
  });

  describe("signUp", () => {
    test("returns 400 if email, password, or accountType are missing", async () => {
      req.body = {};

      await signUp(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith("Bad request");
    });

    test("returns 409 if user already exists", async () => {
      req.body = {
        email: "zaharbojko@gmail.com",
        password: "12345678",
        accountType: "CONSULTANT",
      };
      const existingUser = { id: "11577cb6-1187-4931-b780-893066106634" };
      (findByEmail as jest.Mock).mockResolvedValue(existingUser);

      await signUp(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(409);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "The user already exists",
      });
    });

    test("returns 201 and a token if registration is successful", async () => {
      req.body = {
        email: "zaharbojko@gmail.com",
        password: "12345678",
        accountType: "CONSULTANT",
      };
      (findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(
        "$2b$10$EtezwJOsYtbV8aVsUlwWJ.0wLcAuN39Oe0KpK0p1iSr1m.27KuypW"
      );
      const user = { id: "11577cb6-1187-4931-b780-893066106634" };
      (createUser as jest.Mock).mockResolvedValue(user);
      (jwt.sign as jest.Mock).mockReturnValue("token");

      await signUp(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(sendMock).toHaveBeenCalledWith({ status: "ok", token: "token" });
    });

    test("returns 500 if an error occurs", async () => {
      req.body = {
        email: "zaharbojko@gmail.com",
        password: "12345678",
        accountType: "CONSULTANT",
      };
      const error = new Error("Test error");
      (findByEmail as jest.Mock).mockImplementation(() => {
        throw error;
      });

      await signUp(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith({ error: "Registration failed" });
    });
  });
});
