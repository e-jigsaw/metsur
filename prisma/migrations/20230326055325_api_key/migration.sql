-- CreateTable
CREATE TABLE "PicsurApiKey" (
    "key" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PicsurApiKey_key_key" ON "PicsurApiKey"("key");

-- AddForeignKey
ALTER TABLE "PicsurApiKey" ADD CONSTRAINT "PicsurApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
