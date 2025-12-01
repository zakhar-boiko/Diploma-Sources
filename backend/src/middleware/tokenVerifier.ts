import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const tokenVerifier = (req: Request, res: Response, next: Function) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    jwt.verify(token, process.env.SECRET_KEY as string);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export {tokenVerifier};
