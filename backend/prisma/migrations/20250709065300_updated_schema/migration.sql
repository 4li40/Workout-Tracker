/*
  Warnings:

  - Made the column `updatedAt` on table `exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `set` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `workout` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "exercise_workoutId_key";

-- DropIndex
DROP INDEX "set_exerciseId_key";

-- DropIndex
DROP INDEX "workout_userId_key";

-- AlterTable
ALTER TABLE "exercise" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "set" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "workout" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL;
