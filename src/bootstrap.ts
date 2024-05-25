import { UserRepository } from "./repositories/UserRepository";
import { BookRepository } from "./repositories/BookRepository";
import { BookingRepository } from "./repositories/BookingRepository";

import { AuthService } from "./services/AuthService.js";
import { BookService } from "./services/BookService";
import { BookingService } from "./services/BookingService";

import { AuthController } from "./controllers/AuthController";
import { BookController } from "./controllers/BooksController";
import { BookingController } from "./controllers/BookingController";

export const userRepository = new UserRepository();
export const bookRepository = new BookRepository();
export const bookingRepository = new BookingRepository();

export const authService = new AuthService(userRepository);
export const bookService = new BookService(bookRepository);
export const bookingService = new BookingService(bookingRepository, bookRepository);

export const authController = new AuthController(authService);
export const bookController = new BookController(bookService);
export const bookingController = new BookingController(bookingService);
