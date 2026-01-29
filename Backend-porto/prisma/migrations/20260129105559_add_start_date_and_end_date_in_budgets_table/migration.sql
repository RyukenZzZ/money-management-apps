/*
  Warnings:

  - You are about to drop the column `created_at` on the `budgets` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `budgets` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_category_id_fkey";

-- DropForeignKey
ALTER TABLE "budgets" DROP CONSTRAINT "budgets_user_id_fkey";

-- AlterTable
ALTER TABLE "budgets" DROP COLUMN "created_at",
DROP COLUMN "period",
ADD COLUMN     "end_date" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
