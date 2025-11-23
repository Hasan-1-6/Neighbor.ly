/*
  Warnings:

  - You are about to drop the column `totalFloors` on the `Apartment` table. All the data in the column will be lost.
  - Added the required column `FlatCount` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FloorCount` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apart` to the `Resident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flat` to the `Resident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `Resident` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Flat" DROP CONSTRAINT "Flat_occupiedById_fkey";

-- DropForeignKey
ALTER TABLE "public"."Floor" DROP CONSTRAINT "Floor_apartmentId_fkey";

-- DropIndex
DROP INDEX "public"."Flat_flatNum_key";

-- AlterTable
ALTER TABLE "public"."Apartment" DROP COLUMN "totalFloors",
ADD COLUMN     "FlatCount" INTEGER NOT NULL,
ADD COLUMN     "FloorCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Resident" ADD COLUMN     "apart" TEXT NOT NULL,
ADD COLUMN     "flat" INTEGER NOT NULL,
ADD COLUMN     "floor" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Floor" ADD CONSTRAINT "Floor_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "public"."Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Flat" ADD CONSTRAINT "Flat_occupiedById_fkey" FOREIGN KEY ("occupiedById") REFERENCES "public"."Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
