-- CreateTable
CREATE TABLE "MetsurApiKey" (
    "key" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MetsurApiKey_pkey" PRIMARY KEY ("key")
);

-- AddForeignKey
ALTER TABLE "MetsurApiKey" ADD CONSTRAINT "MetsurApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
