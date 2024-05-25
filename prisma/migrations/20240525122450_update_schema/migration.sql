/*
  Warnings:

  - You are about to drop the column `author` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `isbn` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `pass_hash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cod]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `autor` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookCategoryId` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editora` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sinopse` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "books_isbn_key";

-- DropIndex
DROP INDEX "users_cpf_key";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "author",
DROP COLUMN "isbn",
ADD COLUMN     "autor" TEXT NOT NULL,
ADD COLUMN     "bookCategoryId" TEXT NOT NULL,
ADD COLUMN     "cod" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "editora" TEXT NOT NULL,
ADD COLUMN     "idUser" TEXT NOT NULL,
ADD COLUMN     "qtd" INTEGER NOT NULL,
ADD COLUMN     "sinopse" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cpf",
DROP COLUMN "created_at",
DROP COLUMN "pass_hash",
DROP COLUMN "phone",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "book_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "book_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "idBook" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_categories_name_key" ON "book_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "books_cod_key" ON "books"("cod");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_bookCategoryId_fkey" FOREIGN KEY ("bookCategoryId") REFERENCES "book_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_idBook_fkey" FOREIGN KEY ("idBook") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
