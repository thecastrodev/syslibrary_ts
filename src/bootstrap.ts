import { BookRepository } from "./repositories/BookRepository";
import { BookingRepository } from "./repositories/BookingRepository";

import { BookService } from "./services/BookService";
import { BookingService } from "./services/BookingService";

import { BookController } from "./controllers/BooksController";
import { BookingController } from "./controllers/BookingController";

export const bookRepository = new BookRepository();
export const bookingRepository = new BookingRepository();

export const bookService = new BookService(bookRepository);
export const bookingService = new BookingService(bookingRepository, bookRepository);

export const bookController = new BookController(bookService);
export const bookingController = new BookingController(bookingService);
