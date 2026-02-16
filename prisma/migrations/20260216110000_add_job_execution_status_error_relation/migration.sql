-- AlterTable
ALTER TABLE "JobExecution"
ADD COLUMN "status" "JobExecutionStatus" NOT NULL DEFAULT 'STARTED',
ADD COLUMN "errorSanitized" TEXT;

-- CreateIndex
CREATE INDEX "JobExecution_jobAuditId_idx" ON "JobExecution"("jobAuditId");

-- AddForeignKey
ALTER TABLE "JobExecution"
ADD CONSTRAINT "JobExecution_jobAuditId_fkey"
FOREIGN KEY ("jobAuditId") REFERENCES "JobAudit"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
