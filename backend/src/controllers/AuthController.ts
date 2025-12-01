import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { TypedRequestBody } from "../types/RequestTypes";
import { createUser, findByEmail } from "../repositories/UserRepository";
import jwt from "jsonwebtoken";
import { SignInRequestType } from "../types/AuthTypes";
import { ClientType, ConsultantType } from "../types/UserTypes";
import { checkPassword } from "../services/AuthService";

const signIn = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization ?? "";
    const [type, credentials] = authHeader.split(" ");

    if (type !== "Basic" || !credentials) {
      return res
        .status(400)
        .json({ error: "Authorization header with Basic auth required" });
    }

    const [email, password] = Buffer.from(credentials, "base64")
      .toString("ascii")
      .split(":");

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await findByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ error: `User with email ${email} not found` });
    }

    const passwordMatch = await checkPassword(password, user?.password ?? "");
    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      { userId: user.id as string },
      process.env.SECRET_KEY as string
    );

    res.status(200).json({ status: "ok", token });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

const signUp = async (
  req: TypedRequestBody<ClientType | ConsultantType>,
  res: Response
) => {
  try {
    const authHeader = req.headers.authorization ?? "";
    const [type, credentials] = authHeader.split(" ");

    if (type !== "Basic" || !credentials) {
      return res
        .status(400)
        .json({ error: "Authorization header with Basic auth required" });
    }

    const [email, password] = Buffer.from(credentials, "base64")
      .toString("ascii")
      .split(":");

    const { accountType } = req.body;
    if (!email || !password || !accountType) {
      return res.status(400).send("Bad request");
    }

    const existingUser = await findByEmail(email);

    if (existingUser) {
      return res.status(409).json({ error: "The user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      ...req.body,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user.id as string },
      process.env.SECRET_KEY as string
    );

    return res.status(201).send({ status: "ok", token: token });
  } catch (error) {
    return res.status(500).send({ error: "Registration failed" });
  }
};

export { signUp, signIn };
