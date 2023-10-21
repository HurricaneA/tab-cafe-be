/*
  Warnings:

  - You are about to drop the column `order` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "order",
ADD COLUMN     "isCompleted" BOOLEAN DEFAULT false,
ADD COLUMN     "orders" JSONB;
