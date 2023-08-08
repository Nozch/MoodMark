/*
  Warnings:

  - You are about to drop the column `frame` on the `Stamp` table. All the data in the column will be lost.
  - You are about to drop the column `gradientId` on the `Stamp` table. All the data in the column will be lost.
  - You are about to drop the column `mainFigure` on the `Stamp` table. All the data in the column will be lost.
  - You are about to drop the `ControlPoint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gradient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color1` to the `Stamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color2` to the `Stamp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ControlPoint" DROP CONSTRAINT "ControlPoint_stampId_fkey";

-- DropForeignKey
ALTER TABLE "Gradient" DROP CONSTRAINT "Gradient_stampId_fkey";

-- AlterTable
ALTER TABLE "Stamp" DROP COLUMN "frame",
DROP COLUMN "gradientId",
DROP COLUMN "mainFigure",
ADD COLUMN     "color1" TEXT NOT NULL,
ADD COLUMN     "color2" TEXT NOT NULL;

-- DropTable
DROP TABLE "ControlPoint";

-- DropTable
DROP TABLE "Gradient";
