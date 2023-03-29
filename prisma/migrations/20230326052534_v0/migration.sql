/*
  Warnings:

  - You are about to drop the `ImageV2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImageV2" DROP CONSTRAINT "ImageV2_userId_fkey";

-- DropTable
DROP TABLE "ImageV2";

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "picsurId" TEXT NOT NULL,
    "tags" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_picsurId_key" ON "Image"("picsurId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
