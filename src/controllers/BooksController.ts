import { Request, Response } from "express";
import Zod from "zod";

import { prisma } from "../libs/prisma";
import { AppError } from "../errors/AppError";
import { excludeFields } from "../utils/excludeFields";

export class BooksController {
  async index(_: Request, response: Response) {
    const books = await prisma.book.findMany();

    return response.status(200).json(books);
  }

  async create(request: Request, response: Response) {
    const bodySchema = Zod.object({
      isbn: Zod.string().min(6),
      title: Zod.string().min(3),
      author: Zod.string().min(3),
    }).strict();
    
    const {
        isbn,
        title,
        author,
    } = bodySchema.parse(request.body);

    const isbnExists = await prisma.book.findUnique({
      where: { isbn },
    });
    if (isbnExists)
      throw new AppError(`Conflit - ISBN already exists! `, 409);

    const book = await prisma.book.create({
        data: {
            isbn,
            title,
            author
        }
    });

    return response.status(200).json(book);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const book = await prisma.book.findFirst({
      where: { id }
    });

    if (!book) throw new AppError(`Book not found! `, 404);

    return response.status(200).json(book);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    
    const {
      isbn,
      title,
      author,
    } = request.body;

    const bookExists = await prisma.book.findFirst({
      where: { id },
    });

    if (!bookExists) throw new AppError("Book not found!", 404);

    let data = {};
    if (isbn) data = { ...data, isbn};
    if (title) data = { ...data, title};
    if (author) data = { ...data, author };

    const book = await prisma.book.update({
      where: { id },
      data
    });

    return response.status(200).json(book);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const book = await prisma.book.findFirst({
      where: { id },
    });

    if (!book) throw new AppError("Book not found!", 404);

    await prisma.book.delete({
      where: { id },
    });

    return response.status(204).json();
  }
}