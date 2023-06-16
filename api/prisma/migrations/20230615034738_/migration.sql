-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_main_image_post_id_fkey";

-- AlterTable
ALTER TABLE "image" ALTER COLUMN "main_image_post_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_main_image_post_id_fkey" FOREIGN KEY ("main_image_post_id") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
