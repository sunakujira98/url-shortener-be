-- CreateTable
CREATE TABLE "url_shortener" (
    "id" SERIAL NOT NULL,
    "short_url" TEXT NOT NULL,
    "long_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visit" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "url_shortener_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "url_shortener_short_url_key" ON "url_shortener"("short_url");
