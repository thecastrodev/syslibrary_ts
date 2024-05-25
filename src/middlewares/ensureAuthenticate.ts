import { Response, NextFunction } from "express";
import { Request } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";
import config_env from "../utils/config";

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
    verify(token, config_env.jwt_key);
    // const { sub } = verify(token, env.jwtSecretKey);
    // request.userId = sub as string;

    next();
  } catch {
    throw new AppError("Token invalid", 401);
  }
}
