-- AlterTable
ALTER TABLE "join_codes" ALTER COLUMN "expire_time" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "meetings" ALTER COLUMN "start_date" SET DEFAULT 0,
ALTER COLUMN "created_at" SET DEFAULT 0,
ALTER COLUMN "updated_at" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "streamings" ALTER COLUMN "started_at" SET DEFAULT 0,
ALTER COLUMN "ended_at" SET DEFAULT 0;

-- CreateIndex
CREATE INDEX "meetings_start_date_idx" ON "meetings"("start_date");
