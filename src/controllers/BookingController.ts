import { Request } from "express";
import { z } from "zod";

import { AppError } from "../errors/AppError";
import { BookingService } from "../services/BookingService";

export class BookingController {
  service: BookingService;

  constructor(service: BookingService) {
    this.service = service;
  }
  // register
  async register(request: Request) {
    const bodySchema = z
      .object({
        bookId: z.string().min(1),
      })
      .strict();

    const { idUser } = request;

    const { bookId } = bodySchema.parse(request.body);

    const body = await this.service.register(idUser, bookId);
    return { status: 201, body: body };
  }

  // list by user
  async listByUser(request: Request) {
    const bodySchema = z
      .object({
        page: z.string().default("1"),
        pageSize: z.string().default("10"),
        search: z.string().default(""),
      })
      .strict();

    let { page, pageSize, search } = bodySchema.parse(request.query);

    const pageNumber = parseInt(page, 10);

    if (isNaN(pageNumber) || pageNumber <= 0)
      throw new AppError("O parâmetro pageSize deve ser um número e maior que 0.");

    const pageSizeNumber = parseInt(pageSize, 10);

    if (isNaN(pageSizeNumber) || pageSizeNumber <= 0)
      throw new AppError("O parâmetro pageSize deve ser um número e maior que 0.");
    
    const { idUser } = request;
    const body = await this.service.listByUser(idUser, pageNumber, pageSizeNumber, search);
    return { status: 200, body: body };
  }
}