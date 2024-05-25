import { prisma } from "../libs/prisma";
import { User } from "../models/User";
import { AppError } from "../errors/AppError";

export class UserRepository {
  // save
  async save(
    username: string,
    name: string,
    email: string,
    passwordHash: string
  ) {
    try {
      await prisma.user.create({
        data: {
          username,
          name: name.toLocaleLowerCase(),
          email,
          passwordHash,
        },
      });
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao salvar usuário", 500);
    }
  }

  // findByEmailWithPassword
  async findByEmailWithPassword(email: string) {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    return user ? user : null;
  }

  // findByEmail
  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    return user ? new User(user) : null;
  }

  // findById
  async findById(id: string) {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    return user ? new User(user) : null;
  }

  // findByUserName
  async findByUserName(username: string) {
    const user = await prisma.user.findFirst({
      where: { username },
    });
    return user ? new User(user) : null;
  }

  // patch
  async patch(id: string, data: object) {
    try {
      await prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao atualizar usuário", 500);
    }
  }

  // delete
  async delete(id: string) {
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          idUser: id,
        },
      });

      // Excluir todas as reservas associadas ao usuário
      const deleteBookingsPromises = bookings.map((booking) =>
        prisma.booking.delete({
          where: {
            id: booking.id,
          },
        })
      );
      await Promise.all(deleteBookingsPromises);

      // Agora que todas as reservas foram excluídas, exclua o usuário
      await prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao deletar usuário", 500);
    }
  }
}