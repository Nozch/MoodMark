/*
  Warnings:

  - The primary key for the `ControlPoint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Gradient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `ControlPoint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stampId]` on the table `ControlPoint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Gradient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stampId]` on the table `Gradient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gradientId` to the `Stamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ControlPoint" DROP CONSTRAINT "ControlPoint_pkey";

-- AlterTable
ALTER TABLE "Gradient" DROP CONSTRAINT "Gradient_pkey";

-- AlterTable
ALTER TABLE "Stamp" ADD COLUMN     "gradientId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ControlPoint_id_key" ON "ControlPoint"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ControlPoint_stampId_key" ON "ControlPoint"("stampId");

-- CreateIndex
CREATE UNIQUE INDEX "Gradient_id_key" ON "Gradient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Gradient_stampId_key" ON "Gradient"("stampId");
