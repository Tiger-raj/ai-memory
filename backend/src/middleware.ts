import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Authorization header must start with 'Bearer '" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    //@ts-ignore
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "You are not logged in." });
  }
};
