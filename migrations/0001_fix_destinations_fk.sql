-- Fix foreign key constraint for destinations table
-- Make sure related_gallery_id can be null to prevent constraint violations

ALTER TABLE "destinations" ALTER COLUMN "related_gallery_id" DROP NOT NULL;

-- Add a check to ensure that if related_gallery_id is provided, it must exist in gallery_collections
-- This is already handled by the existing foreign key constraint