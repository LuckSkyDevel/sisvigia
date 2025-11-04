import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const generateToken = (id: number) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token missing" });

  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number };
    (req as any).userId = payload.id;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};