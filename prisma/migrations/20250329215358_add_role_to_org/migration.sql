-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIM', 'MEMBER');

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';
