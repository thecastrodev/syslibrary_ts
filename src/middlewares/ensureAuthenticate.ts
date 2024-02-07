import { Response, NextFunction } from "express";
import { Request } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";
import { env } from "../utils/env";

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization;
  if (!auth) {
    return response.status(401).json({
      message: "Token required",
    });
  }

  const [_, token] = auth.split(" ");

  try {
    verify(token, env.jwtSecretKey);
    // const { sub } = verify(token, env.jwtSecretKey);
    // request.userId = sub as string;

    next();
  } catch {
    throw new AppError("Token invalid", 401);
  }
}
