import { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import Zod from "zod";
import { AppError } from "../errors/AppError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class AuthenticateController {
  async connect(request: Request, response: Response) {
    const bodySchema = Zod.object({
      email: Zod.string().email(),
      password: Zod.string().min(6),
    }).strict();

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) throw new AppError("Email or password incorrect!", 401);

    const passMatch = await compare(password, user.pass_hash);

    if (!passMatch) throw new AppError("Email or password incorrect!", 401);

    const token = sign({}, process.env.JWT_SECRET_KEY || "secret_key", {
      subject: user.id,
      expiresIn: "1d",
    });

    return response.status(200).json({ token });
  }
}