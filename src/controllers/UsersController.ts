import { Request, Response } from "express";
import Zod from "zod";
import { hash } from "bcrypt";

import { prisma } from "../libs/prisma";
import { AppError } from "../errors/AppError";
import { excludeFields } from "../utils/excludeFields";

export class UsersController {
  async index(_: Request, response: Response) {
    const users = await prisma.user.findMany();

    const usersWithoutPasshash = users.map((user) =>
      excludeFields(user, ["pass_hash"])
    );

    return response.status(200).json(usersWithoutPasshash);
  }

  async create(request: Request, response: Response) {
    const bodySchema = Zod.object({
      name: Zod.string().min(3),
      email: Zod.string().email(),
      password: Zod.string().min(6),
      password_confirm: Zod.string().min(6),
      phone: Zod.string().min(11),
      cpf: Zod.string().length(14),
    }).strict();
    
    const {
      name,
      email,
      password,
      password_confirm,
      phone,
      cpf,
    } = bodySchema.parse(request.body);

    const emailExists = await prisma.user.findUnique({
      where: { email },
    });
    if (emailExists)
      throw new AppError(`Conflit - Email already exists! `, 409);

    const cpfExists = await prisma.user.findFirst({
      where: { cpf },
    });
    if (cpfExists) throw new AppError(`Conflit - CPF already exists! `, 409);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            pass_hash: await hash(password, 6),
            phone,
            cpf,
        }
    });

    const usersWithoutPasshash = excludeFields(user, ["pass_hash"]);

    return response.status(200).json(usersWithoutPasshash);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) throw new AppError(`User not found! `, 404);

    const usersWithoutPasshash = excludeFields(user, ["pass_hash"]);

    return response.status(200).json(usersWithoutPasshash);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    
    const bodySchema = Zod.object({
      email: Zod.string().email(),
      phone: Zod.string().min(11),
    }).strict();

    const {
      email,
      phone,
    } = bodySchema.parse(request.body);

    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) throw new AppError("User not found!", 404);

    let data = {};
    if (email) data = { ...data, email};
    if (phone) data = { ...data, phone };

    const user = await prisma.user.update({
      where: { id },
      data
    });

    const usersWithoutPasshash = excludeFields(user, ["pass_hash"]);

    return response.status(200).json(usersWithoutPasshash);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new AppError("User not found!", 404);

    await prisma.user.delete({
      where: { id },
    });

    return response.status(204).json();
  }
}