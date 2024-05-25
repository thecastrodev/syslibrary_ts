import { BookRepository } from "./repositories/BookRepository";
import { BookController } from "./controllers/BooksController";
import { BookService } from "./services/BookService";

export const bookRepository = new BookRepository();
export const bookService = new BookService(bookRepository);
export const bookController = new BookController(bookService);
