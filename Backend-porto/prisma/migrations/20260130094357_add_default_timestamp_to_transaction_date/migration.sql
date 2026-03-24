/*
  Warnings:

  - You are about to drop the column `created_at` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ALTER COLUMN "transaction_date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "transaction_date" SET DATA TYPE TIMESTAMP(6);
