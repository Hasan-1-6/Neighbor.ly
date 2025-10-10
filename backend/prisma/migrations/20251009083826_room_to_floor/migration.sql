/*
  Warnings:

  - You are about to drop the column `room` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `room` on the `Resident` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[flat]` on the table `History` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[flat]` on the table `Resident` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contact` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flat` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flat` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `floor` on the `Notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `flat` to the `Resident` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."History_room_key";

-- DropIndex
DROP INDEX "public"."Resident_room_key";

-- AlterTable
ALTER TABLE "public"."Admin" ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."History" DROP COLUMN "room",
ADD COLUMN     "flat" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Notifications" DROP COLUMN "room",
ADD COLUMN     "flat" INTEGER NOT NULL,
DROP COLUMN "floor",
ADD COLUMN     "floor" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Resident" DROP COLUMN "room",
ADD COLUMN     "flat" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Apartments" (
    "id" TEXT NOT NULL,
    "apart" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "flat" INTEGER NOT NULL,
    "occupied" TEXT,

    CONSTRAINT "Apartments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "History_flat_key" ON "public"."History"("flat");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_flat_key" ON "public"."Resident"("flat");
