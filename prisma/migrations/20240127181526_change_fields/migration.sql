/*
  Warnings:

  - You are about to drop the column `isAviable` on the `Category` table. All the data in the column will be lost.
  - Added the required column `name` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `Brand` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `status` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Brand" ALTER COLUMN "image" SET NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "isAviable",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "status",
ADD COLUMN     "status" "PaymentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET NOT NULL;
