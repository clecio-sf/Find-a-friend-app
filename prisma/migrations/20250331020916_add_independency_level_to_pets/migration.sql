/*
  Warnings:

  - Added the required column `independencyLevel` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IndependencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "independencyLevel" "IndependencyLevel" NOT NULL;
