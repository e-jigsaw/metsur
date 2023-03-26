-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "picsurId" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_picsurId_key" ON "Image"("picsurId");
