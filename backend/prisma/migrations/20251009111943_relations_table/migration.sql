/*
  Warnings:

  - You are about to drop the column `createdAt` on the `History` table. All the data in the column will be lost.
  - You are about to drop the `Apartments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdBy` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."History_flat_key";

-- DropIndex
DROP INDEX "public"."Resident_contact_key";

-- AlterTable
ALTER TABLE "public"."History" DROP COLUMN "createdAt",
ADD COLUMN     "resolvedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "apart" DROP NOT NULL,
ALTER COLUMN "floor" DROP NOT NULL,
ALTER COLUMN "flat" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Notifications" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "handledBy" TEXT,
ALTER COLUMN "apart" DROP NOT NULL,
ALTER COLUMN "resolutionTime" DROP NOT NULL,
ALTER COLUMN "flat" DROP NOT NULL,
ALTER COLUMN "floor" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."Apartments";

-- CreateTable
CREATE TABLE "public"."Flats" (
    "occupiedById" TEXT NOT NULL,
    "apart" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "flat" INTEGER NOT NULL,

    CONSTRAINT "Flats_pkey" PRIMARY KEY ("occupiedById")
);

-- AddForeignKey
ALTER TABLE "public"."Flats" ADD CONSTRAINT "Flats_occupiedById_fkey" FOREIGN KEY ("occupiedById") REFERENCES "public"."Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payHistory" ADD CONSTRAINT "payHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
