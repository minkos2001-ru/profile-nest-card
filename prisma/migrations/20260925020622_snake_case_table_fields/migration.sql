/*
  Warnings:

  - You are about to drop the column `endDate` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `experiences` table. All the data in the column will be lost.
  - The primary key for the `profile_skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profileId` on the `profile_skills` table. All the data in the column will be lost.
  - You are about to drop the column `skillId` on the `profile_skills` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `projects` table. All the data in the column will be lost.
  - The primary key for the `social_links` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profileId` on the `social_links` table. All the data in the column will be lost.
  - Added the required column `profile_id` to the `experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `experiences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `profile_skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skill_id` to the `profile_skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `social_links` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "experiences" DROP CONSTRAINT "experiences_profileId_fkey";

-- DropForeignKey
ALTER TABLE "profile_skills" DROP CONSTRAINT "profile_skills_profileId_fkey";

-- DropForeignKey
ALTER TABLE "profile_skills" DROP CONSTRAINT "profile_skills_skillId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_profileId_fkey";

-- DropForeignKey
ALTER TABLE "social_links" DROP CONSTRAINT "social_links_profileId_fkey";

-- AlterTable
ALTER TABLE "experiences" DROP COLUMN "endDate",
DROP COLUMN "profileId",
DROP COLUMN "startDate",
ADD COLUMN     "end_date" DATE,
ADD COLUMN     "profile_id" INTEGER NOT NULL,
ADD COLUMN     "start_date" DATE NOT NULL;

-- AlterTable
ALTER TABLE "profile_skills" DROP CONSTRAINT "profile_skills_pkey",
DROP COLUMN "profileId",
DROP COLUMN "skillId",
ADD COLUMN     "profile_id" INTEGER NOT NULL,
ADD COLUMN     "skill_id" INTEGER NOT NULL,
ADD CONSTRAINT "profile_skills_pkey" PRIMARY KEY ("profile_id", "skill_id");

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "profileId",
ADD COLUMN     "profile_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "social_links" DROP CONSTRAINT "social_links_pkey",
DROP COLUMN "profileId",
ADD COLUMN     "profile_id" INTEGER NOT NULL,
ADD CONSTRAINT "social_links_pkey" PRIMARY KEY ("source", "profile_id");

-- AddForeignKey
ALTER TABLE "profile_skills" ADD CONSTRAINT "profile_skills_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_skills" ADD CONSTRAINT "profile_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
