-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('DOG', 'CAT', 'BIRD', 'FISH', 'REPTILE', 'SMALL_ANIMAL');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "petType" "PetType" NOT NULL DEFAULT 'DOG';
