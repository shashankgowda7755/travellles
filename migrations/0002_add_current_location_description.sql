-- Migration: Add current location description column and update current location
ALTER TABLE "journey_tracking" ADD COLUMN "current_location_description" text NOT NULL DEFAULT 'A city where festivals never really end';

-- Update existing records to new location
UPDATE "journey_tracking" 
SET 
  "current_location" = 'Thrissur, Kerala',
  "current_location_description" = 'A city where festivals never really end',
  "last_updated" = NOW()
WHERE "current_location" IS NOT NULL;

-- If no records exist, insert a new one
INSERT INTO "journey_tracking" (
  "current_location", 
  "current_location_description",
  "current_coordinates", 
  "journey_progress", 
  "days_traveled", 
  "states_covered", 
  "distance_covered"
)
SELECT 
  'Thrissur, Kerala',
  'A city where festivals never really end',
  '{"lat": 10.5276, "lng": 76.2144}',
  65,
  78,
  9,
  1950
WHERE NOT EXISTS (SELECT 1 FROM "journey_tracking");