-- CreateEnum
CREATE TYPE "SocialLinkSource" AS ENUM ('GITHUB', 'LINKEDIN', 'WEBSITE');

-- CreateTable
CREATE TABLE "SocialLink" (
    "source" "SocialLinkSource" NOT NULL,
    "url" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("source","profileId")
);

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
