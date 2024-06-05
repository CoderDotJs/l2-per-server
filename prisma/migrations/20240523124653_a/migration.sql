-- DropForeignKey
ALTER TABLE "claims" DROP CONSTRAINT "claims_id_fkey";

-- DropForeignKey
ALTER TABLE "founditems" DROP CONSTRAINT "founditems_id_fkey";

-- DropForeignKey
ALTER TABLE "lostitems" DROP CONSTRAINT "lostitems_id_fkey";

-- AddForeignKey
ALTER TABLE "lostitems" ADD CONSTRAINT "lostitems_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "founditems" ADD CONSTRAINT "founditems_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_description_fkey" FOREIGN KEY ("description") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
