/*
  Warnings:

  - Made the column `checkoutSessionId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "checkoutSessionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "stripeSessionId" DROP NOT NULL;
